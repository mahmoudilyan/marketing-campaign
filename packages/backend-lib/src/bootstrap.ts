import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import {
  DEBUG_USER_ID1,
  SUBSCRIPTION_SECRET_NAME,
} from "isomorphic-lib/src/constants";

import { segmentIdentifyEvent } from "../test/factories/segment";
import { createWriteKey } from "./auth";
import { getDefaultMessageTemplates } from "./bootstrap/messageTemplates";
import { createClickhouseDb } from "./clickhouse";
import config from "./config";
import { generateSecureKey } from "./crypto";
import { kafkaAdmin } from "./kafka";
import logger from "./logger";
import { upsertMessageTemplate } from "./messageTemplates";
import prisma from "./prisma";
import { prismaMigrate } from "./prisma/migrate";
import {
  computePropertiesWorkflow,
  generateComputePropertiesId,
} from "./segments/computePropertiesWorkflow";
import { upsertSubscriptionGroup } from "./subscriptionGroups";
import connectWorkflowClient from "./temporal/connectWorkflowClient";
import {
  ChannelType,
  SubscriptionGroupType,
  UserPropertyDefinitionType,
} from "./types";
import {
  createUserEventsTables,
  insertUserEvents,
} from "./userEvents/clickhouse";

async function bootstrapPostgres({
  workspaceId,
  workspaceName,
  workspaceDomain,
}: {
  workspaceId: string;
  workspaceName: string;
  workspaceDomain?: string;
}) {
  const { defaultUserEventsTableVersion } = config();

  await prismaMigrate();

  // TODO allow workspace name to be updated
  await prisma().workspace.upsert({
    where: {
      id: workspaceId,
    },
    update: {
      domain: workspaceDomain,
    },
    create: {
      id: workspaceId,
      name: workspaceName,
      domain: workspaceDomain,
    },
  });

  await prisma().currentUserEventsTable.upsert({
    where: {
      workspaceId,
    },
    create: {
      workspaceId,
      version: defaultUserEventsTableVersion,
    },
    update: {},
  });

  const userProperties: Prisma.UserPropertyUncheckedCreateWithoutUserPropertyAssignmentInput[] =
    [
      {
        name: "id",
        workspaceId,
        definition: {
          type: UserPropertyDefinitionType.Id,
        },
      },
      {
        name: "anonymousId",
        workspaceId,
        definition: {
          type: UserPropertyDefinitionType.AnonymousId,
        },
      },
      {
        name: "email",
        workspaceId,
        definition: {
          type: UserPropertyDefinitionType.Trait,
          path: "email",
        },
      },
      {
        name: "phone",
        workspaceId,
        definition: {
          type: UserPropertyDefinitionType.Trait,
          path: "phone",
        },
      },
      {
        name: "deviceToken",
        workspaceId,
        definition: {
          type: UserPropertyDefinitionType.Trait,
          path: "deviceToken",
        },
      },
      {
        name: "firstName",
        workspaceId,
        definition: {
          type: UserPropertyDefinitionType.Trait,
          path: "firstName",
        },
      },
      {
        name: "lastName",
        workspaceId,
        definition: {
          type: UserPropertyDefinitionType.Trait,
          path: "lastName",
        },
      },
      {
        name: "language",
        workspaceId,
        definition: {
          type: UserPropertyDefinitionType.Trait,
          path: "language",
        },
      },
      {
        name: "accountManager",
        workspaceId,
        definition: {
          type: UserPropertyDefinitionType.Trait,
          path: "accountManager",
        },
      },
    ];

  await Promise.all([
    ...userProperties.map((up) =>
      prisma().userProperty.upsert({
        where: {
          workspaceId_name: {
            workspaceId: up.workspaceId,
            name: up.name,
          },
        },
        create: up,
        update: up,
      })
    ),
    prisma().secret.upsert({
      where: {
        workspaceId_name: {
          workspaceId,
          name: SUBSCRIPTION_SECRET_NAME,
        },
      },
      create: {
        workspaceId,
        name: SUBSCRIPTION_SECRET_NAME,
        value: generateSecureKey(8),
      },
      update: {},
    }),
    createWriteKey({
      workspaceId,
      writeKeyName: "default-write-key",
      writeKeyValue: generateSecureKey(8),
    }),
    ...getDefaultMessageTemplates({
      workspaceId,
    }).map(upsertMessageTemplate),
  ]);

  await Promise.all([
    upsertSubscriptionGroup({
      workspaceId,
      name: `${workspaceName} - Email`,
      type: SubscriptionGroupType.OptOut,
      channel: ChannelType.Email,
    }),
    upsertSubscriptionGroup({
      workspaceId,
      name: `${workspaceName} - Mobile Push`,
      type: SubscriptionGroupType.OptOut,
      channel: ChannelType.MobilePush,
    }),
  ]);
}

async function bootstrapKafka() {
  const {
    userEventsTopicName,
    kafkaUserEventsPartitions,
    kafkaUserEventsReplicationFactor,
  } = config();
  await kafkaAdmin().connect();

  await kafkaAdmin().createTopics({
    waitForLeaders: true,
    topics: [
      {
        topic: userEventsTopicName,
        numPartitions: kafkaUserEventsPartitions,
        replicationFactor: kafkaUserEventsReplicationFactor,
      },
    ],
  });

  await kafkaAdmin().disconnect();
}

async function bootstrapClickhouse() {
  const { defaultUserEventsTableVersion } = config();

  await createClickhouseDb();

  await createUserEventsTables({
    tableVersion: defaultUserEventsTableVersion,
    ingressTopic: config().userEventsTopicName,
  });
}

async function bootstrapWorker({ workspaceId }: { workspaceId: string }) {
  const temporalClient = await connectWorkflowClient();

  try {
    await temporalClient.start(computePropertiesWorkflow, {
      taskQueue: "default",
      workflowId: generateComputePropertiesId(workspaceId),
      args: [
        {
          tableVersion: config().defaultUserEventsTableVersion,
          workspaceId,
          shouldContinueAsNew: true,
        },
      ],
    });
  } catch (err) {
    logger().error({ err }, "Failed to bootstrap worker.");
  }
}

async function insertDefaultEvents({ workspaceId }: { workspaceId: string }) {
  const messageId1 = randomUUID();
  const messageId2 = randomUUID();
  logger().debug("Inserting default events.");

  await insertUserEvents({
    tableVersion: config().defaultUserEventsTableVersion,
    workspaceId,
    events: [
      {
        messageId: messageId1,
        messageRaw: segmentIdentifyEvent({
          messageId: messageId1,
          userId: DEBUG_USER_ID1,
          traits: {
            status: "onboarding",
            firstName: "Max",
            lastName: "Gurewitz",
            email: "max@email.com",
            plan: "free",
            phone: "8005551234",
            // 1 day ago
            createdAt: new Date(Date.now() - 8.64 * 1000000).toISOString(),
          },
        }),
      },
      {
        messageId: messageId2,
        messageRaw: segmentIdentifyEvent({
          messageId: messageId2,
          traits: {
            status: "onboarded",
            firstName: "Chandler",
            lastName: "Craig",
            email: "chandler@email.com",
            plan: "paid",
            // 2 days ago
            createdAt: new Date(Date.now() - 2 * 8.64 * 1000000).toISOString(),
          },
        }),
      },
    ],
  });
}

export default async function bootstrap({
  workspaceId,
  workspaceName,
  workspaceDomain,
}: {
  workspaceId: string;
  workspaceName: string;
  workspaceDomain?: string;
}) {
  const initialBootstrap = [
    bootstrapPostgres({ workspaceId, workspaceName, workspaceDomain }).catch(
      (err) => logger().error({ err }, "failed to bootstrap postgres")
    ),
    bootstrapClickhouse().catch((err) =>
      logger().error({ err }, "failed to bootstrap clickhouse")
    ),
  ];
  if (config().writeMode === "kafka") {
    initialBootstrap.push(
      bootstrapKafka().catch((err) =>
        logger().error({ err }, "failed to bootstrap kafka")
      )
    );
  }
  await Promise.all(initialBootstrap);

  if (config().bootstrapEvents) {
    await insertDefaultEvents({ workspaceId });
  }

  if (config().bootstrapWorker) {
    await bootstrapWorker({ workspaceId });
  }
}
