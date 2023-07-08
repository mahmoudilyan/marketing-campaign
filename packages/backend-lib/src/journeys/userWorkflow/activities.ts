import {
  EmailProvider,
  JourneyStatus,
  SegmentAssignment,
} from "@prisma/client";
import escapeHTML from "escape-html";
import { CHANNEL_IDENTIFIERS } from "isomorphic-lib/src/channels";
import {
  FCM_SECRET_NAME,
  SUBSCRIPTION_SECRET_NAME,
} from "isomorphic-lib/src/constants";
import { err, ok, Result } from "neverthrow";
import * as R from "remeda";

import { submitTrack } from "../../apps";
import { sendNotification } from "../../destinations/fcm";
import { sendMail as sendEmailSendgrid } from "../../destinations/sendgrid";
import { renderLiquid } from "../../liquid";
import logger from "../../logger";
import { findMessageTemplate } from "../../messageTemplates";
import prisma from "../../prisma";
import { getSubscriptionGroupWithAssignment } from "../../subscriptionGroups";
import {
  ChannelType,
  EmailProviderType,
  InternalEventType,
  JourneyNode,
  JourneyNodeType,
  KnownTrackData,
  MessageTemplateResource,
  SubscriptionGroupType,
  TrackData,
} from "../../types";
import { findAllUserPropertyAssignments } from "../../userProperties";

export { findAllUserPropertyAssignments } from "../../userProperties";

type SendWithTrackingValue = [boolean, KnownTrackData | null];

interface BaseSendParams {
  userId: string;
  workspaceId: string;
  runId: string;
  nodeId: string;
  templateId: string;
  journeyId: string;
  messageId: string;
  subscriptionGroupId?: string;
  channel: ChannelType;
}
interface SendParams<C> extends BaseSendParams {
  getChannelConfig: ({
    workspaceId,
  }: {
    workspaceId: string;
  }) => Promise<Result<C, SendWithTrackingValue>>;
  channelSend: (
    params: BaseSendParams & {
      channelConfig: C;
      identifier: string;
      messageTemplate: MessageTemplateResource;
      subscriptionSecret: string;
      userPropertyAssignments: Awaited<
        ReturnType<typeof findAllUserPropertyAssignments>
      >;
    }
  ) => Promise<SendWithTrackingValue>;
}

type TrackingProperties = BaseSendParams & {
  journeyStatus?: JourneyStatus;
};

function buildSendValueFactory(trackingProperties: TrackingProperties) {
  const innerTrackingProperties = {
    ...R.omit(trackingProperties, ["userId", "workspaceId", "messageId"]),
  };

  return function buildSendValue(
    success: boolean,
    event: InternalEventType,
    properties?: TrackData["properties"]
  ): SendWithTrackingValue {
    return [
      success,
      {
        event,
        messageId: trackingProperties.messageId,
        userId: trackingProperties.userId,
        properties: {
          ...innerTrackingProperties,
          ...properties,
        },
      },
    ];
  };
}

async function sendWithTracking<C>(
  params: SendParams<C>
): Promise<SendWithTrackingValue> {
  const {
    journeyId,
    templateId,
    workspaceId,
    userId,
    runId,
    nodeId,
    messageId,
    subscriptionGroupId,
    getChannelConfig,
    channelSend,
    channel,
  } = params;
  const [
    messageTemplateResult,
    userPropertyAssignments,
    journey,
    subscriptionGroup,
    channelConfig,
    subscriptionSecret,
  ] = await Promise.all([
    findMessageTemplate({
      id: templateId,
      channel,
    }),
    findAllUserPropertyAssignments({ userId, workspaceId }),
    prisma().journey.findUnique({ where: { id: journeyId } }),
    subscriptionGroupId
      ? getSubscriptionGroupWithAssignment({ userId, subscriptionGroupId })
      : null,
    getChannelConfig({ workspaceId }),
    prisma().secret.findUnique({
      where: {
        workspaceId_name: {
          workspaceId,
          name: SUBSCRIPTION_SECRET_NAME,
        },
      },
    }),
  ]);
  const baseParams = {
    journeyId,
    templateId,
    workspaceId,
    userId,
    runId,
    nodeId,
    messageId,
    subscriptionGroupId,
    channel,
  };
  const trackingProperties = {
    ...baseParams,
    journeyStatus: journey?.status,
  };

  const buildSendValue = buildSendValueFactory(trackingProperties);

  if (messageTemplateResult.isErr()) {
    logger().error(
      {
        ...trackingProperties,
        error: messageTemplateResult.error,
      },
      "malformed message template"
    );
    return [false, null];
  }

  const messageTemplate = messageTemplateResult.value;
  if (!messageTemplate) {
    return buildSendValue(false, InternalEventType.BadWorkspaceConfiguration, {
      message: "message template not found",
    });
  }

  if (!journey) {
    return buildSendValue(false, InternalEventType.BadWorkspaceConfiguration, {
      message: "journey not found",
    });
  }

  if (subscriptionGroupId) {
    if (!subscriptionGroup) {
      return buildSendValue(
        false,
        InternalEventType.BadWorkspaceConfiguration,
        {
          message: "subscription group not found",
        }
      );
    }

    const segmentAssignment =
      subscriptionGroup.Segment[0]?.SegmentAssignment[0];

    if (
      segmentAssignment?.inSegment === false ||
      (segmentAssignment === undefined &&
        subscriptionGroup.type === SubscriptionGroupType.OptIn)
    ) {
      // TODO this should skip message, but not cause user to drop out of journey. return value should not be simple boolean
      return buildSendValue(false, InternalEventType.MessageSkipped, {
        SubscriptionGroupType: subscriptionGroup.type,
        inSubscriptionGroupSegment: String(!!segmentAssignment?.inSegment),
        message: "User is not in subscription group",
      });
    }
  }

  if (journey.status !== "Running") {
    return buildSendValue(false, InternalEventType.MessageSkipped);
  }

  const identifierKey = CHANNEL_IDENTIFIERS[channel];
  const identifier = userPropertyAssignments[identifierKey];

  if (!identifier) {
    return buildSendValue(false, InternalEventType.BadWorkspaceConfiguration, {
      identifier,
      identifierKey,
      message: "Identifier not found.",
    });
  }

  if (channelConfig.isErr()) {
    return channelConfig.error;
  }

  if (!subscriptionSecret) {
    logger().error("subscription secret not found");
    return [false, null];
  }

  return channelSend({
    channelConfig: channelConfig.value,
    messageTemplate,
    identifier,
    userPropertyAssignments,
    subscriptionSecret: subscriptionSecret.value,
    ...baseParams,
  });
}

// Add new function sendWhatsAppWithPayload
async function sendWhatsAppWithPayload(
  params: BaseSendParams
): Promise<SendWithTrackingValue> {
  const buildSendValue = buildSendValueFactory(params);

  return sendWithTracking<WhatsAppChannelConfig>({
    ...params,
    async getChannelConfig({ workspaceId }) {
      // TODO: Implement logic to get WhatsApp configuration
    },
    async channelSend({
      workspaceId,
      channel,
      messageTemplate,
      userPropertyAssignments,
      channelConfig,
      identifier,
      subscriptionSecret,
    }) {
      // TODO: Implement logic to send WhatsApp message
    },
  });
}

// Modify sendWithTracking function
async function sendWithTracking<C>(
  params: SendParams<C>
): Promise<SendWithTrackingValue> {
  // Existing code...

  // Modify channelSend function
  return channelSend({
    // Existing code...
    // Add new case for WhatsApp channel
    case ChannelType.WhatsApp:
      return sendWhatsAppWithPayload(params);
  });
}

// Modify sendMobilePushWithPayload function
async function sendMobilePushWithPayload(
  params: BaseSendParams
): Promise<SendWithTrackingValue> {
  // Existing code...

  return sendWithTracking<MobilePushChannelConfig>({
    // Existing code...
    // Modify getChannelConfig and channelSend functions
    async getChannelConfig({ workspaceId }) {
      // Existing code...
      // Add new case for WhatsApp channel
      case ChannelType.WhatsApp:
        // TODO: Implement logic to get WhatsApp configuration
    },
    async channelSend({
      // Existing code...
      // Add new case for WhatsApp channel
      case ChannelType.WhatsApp:
        // TODO: Implement logic to send WhatsApp message
    },
  });
}

// Modify sendEmailWithPayload function
async function sendEmailWithPayload(
  params: BaseSendParams
): Promise<SendWithTrackingValue> {
  // Existing code...

  return sendWithTracking<EmailChannelConfig>({
    // Existing code...
    // Modify getChannelConfig and channelSend functions
    async getChannelConfig({ workspaceId }) {
      // Existing code...
      // Add new case for WhatsApp channel
      case ChannelType.WhatsApp:
        // TODO: Implement logic to get WhatsApp configuration
    },
    async channelSend({
      // Existing code...
      // Add new case for WhatsApp channel
      case ChannelType.WhatsApp:
        // TODO: Implement logic to send WhatsApp message
    },
  });
}

// Modify BaseSendParams and SendParams interfaces
interface BaseSendParams {
  // Existing properties...
  // Add new property for WhatsApp channel
  whatsappChannel?: string;
}

interface SendParams<C> extends BaseSendParams {
  // Existing properties...
  // Add new property for WhatsApp channel
  whatsappChannelSend?: (
    params: BaseSendParams & {
      whatsappChannelConfig: C;
      identifier: string;
      messageTemplate: MessageTemplateResource;
      subscriptionSecret: string;
      userPropertyAssignments: Awaited<
        ReturnType<typeof findAllUserPropertyAssignments>
      >;
    }
  ) => Promise<SendWithTrackingValue>;
}

params: Omit<BaseSendParams, "channel">
): Promise<boolean> {
  const [sent, trackData] = await sendEmailWithPayload({
    ...params,
    channel: ChannelType.Email,
  });
  if (trackData) {
    await submitTrack({ workspaceId: params.workspaceId, data: trackData });
  }
  return sent;
}

export async function isRunnable({
  userId,
  journeyId,
}: {
  journeyId: string;
  userId: string;
}): Promise<boolean> {
  const previousExitEvent = await prisma().userJourneyEvent.findFirst({
    where: {
      journeyId,
      userId,
      type: JourneyNodeType.ExitNode,
    },
  });
  return previousExitEvent === null;
}

export async function onNodeProcessed({
  journeyStartedAt,
  userId,
  node,
  journeyId,
}: {
  journeyStartedAt: number;
  journeyId: string;
  userId: string;
  node: JourneyNode;
}) {
  const journeyStartedAtDate = new Date(journeyStartedAt);
  await prisma().userJourneyEvent.upsert({
    where: {
      journeyId_userId_type_journeyStartedAt: {
        journeyStartedAt: journeyStartedAtDate,
        journeyId,
        userId,
        type: node.type,
      },
    },
    update: {},
    create: {
      journeyStartedAt: journeyStartedAtDate,
      journeyId,
      userId,
      type: node.type,
    },
  });
}

export type OnNodeProcessed = typeof onNodeProcessed;

export function getSegmentAssignment({
  workspaceId,
  segmentId,
  userId,
}: {
  workspaceId: string;
  segmentId: string;
  userId: string;
}): Promise<SegmentAssignment | null> {
  return prisma().segmentAssignment.findUnique({
    where: {
      workspaceId_userId_segmentId: {
        workspaceId,
        segmentId,
        userId,
      },
    },
  });
}
