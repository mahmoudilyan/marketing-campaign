import { err, ok, Result } from "neverthrow";

import { decodeJwtHeader } from "./auth";
import config from "./config";
import prisma from "./prisma";
import { DFRequestContext, Workspace, WorkspaceMemberRole } from "./types";

export enum RequestContextErrorType {
  Unauthorized = "Unauthorized",
  NotOnboarded = "NotOnboarded",
  EmailNotVerified = "EmailNotVerified",
  ApplicationError = "ApplicationError",
}

export interface UnauthorizedError {
  type: RequestContextErrorType.Unauthorized;
  message: string;
}

export interface NotOnboardedError {
  type: RequestContextErrorType.NotOnboarded;
  message: string;
}

export interface ApplicationError {
  type: RequestContextErrorType.ApplicationError;
  message: string;
}

export interface EmailNotVerifiedError {
  type: RequestContextErrorType.EmailNotVerified;
}

export type RequestContextError =
  | UnauthorizedError
  | NotOnboardedError
  | ApplicationError
  | EmailNotVerifiedError;

async function defaultRoleForDomain({
  email,
  memberId,
}: {
  email: string;
  memberId: string;
}): Promise<(WorkspaceMemberRole & { workspace: Workspace }) | null> {
  const domain = email.split("@")[1];
  if (!domain) {
    return null;
  }

  const workspace = await prisma().workspace.findFirst({
    where: {
      domain,
    },
  });

  if (!workspace) {
    return null;
  }
  const role = await prisma().workspaceMemberRole.upsert({
    where: {
      workspaceId_workspaceMemberId: {
        workspaceId: workspace.id,
        workspaceMemberId: memberId,
      },
    },
    update: {
      workspaceId: workspace.id,
      workspaceMemberId: memberId,
      role: "Admin",
    },
    create: {
      workspaceId: workspace.id,
      workspaceMemberId: memberId,
      role: "Admin",
    },
  });
  return { ...role, workspace };
}

export async function getMultiTenantRequestContext({
  authorizationToken,
  authProvider,
}: {
  authorizationToken: string | null;
  authProvider?: string;
}): Promise<Result<DFRequestContext, RequestContextError>> {
  if (!authProvider) {
    return err({
      type: RequestContextErrorType.ApplicationError,
      message: "Misconfigured auth provider, missing.",
    });
  }

  if (!authorizationToken) {
    return err({
      type: RequestContextErrorType.ApplicationError,
      message: "authorizationToken is missing",
    });
  }

  const decodedJwt = decodeJwtHeader(authorizationToken);

  if (!decodedJwt) {
    return err({
      type: RequestContextErrorType.Unauthorized,
      message: "Unable to decode jwt",
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { sub, email, picture, email_verified, name, nickname } = decodedJwt;

  if (!email_verified) {
    return err({
      type: RequestContextErrorType.EmailNotVerified,
    });
  }

  // eslint-disable-next-line prefer-const
  let [member, account] = await Promise.all([
    prisma().workspaceMember.findUnique({
      where: { email },
      include: {
        WorkspaceMemberRole: {
          take: 1,
          include: {
            workspace: true,
          },
        },
      },
    }),
    prisma().workspaceMembeAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider: authProvider,
          providerAccountId: sub,
        },
      },
    }),
  ]);

  if (
    !member ||
    member.emailVerified !== email_verified ||
    member.image !== picture
  ) {
    member = await prisma().workspaceMember.upsert({
      where: { email },
      create: {
        email,
        emailVerified: email_verified,
        image: picture,
        name,
        nickname,
      },
      include: {
        WorkspaceMemberRole: {
          take: 1,
          include: {
            workspace: true,
          },
        },
      },
      update: {
        emailVerified: email_verified,
        image: picture,
        name,
        nickname,
      },
    });
  }

  if (!account) {
    await prisma().workspaceMembeAccount.upsert({
      where: {
        provider_providerAccountId: {
          provider: authProvider,
          providerAccountId: sub,
        },
      },
      create: {
        provider: authProvider,
        providerAccountId: sub,
        workspaceMemberId: member.id,
      },
      update: {},
    });
  }

  // TODO allow users to switch between workspaces
  const role =
    member.WorkspaceMemberRole[0] ??
    (await defaultRoleForDomain({ email, memberId: member.id }));

  if (!role) {
    return err({
      type: RequestContextErrorType.NotOnboarded,
      message: "User missing role",
    });
  }

  if (!member.email) {
    return err({
      type: RequestContextErrorType.ApplicationError,
      message: "User missing email",
    });
  }

  return ok({
    member: {
      id: member.id,
      email: member.email,
      emailVerified: member.emailVerified,
      name: member.name ?? undefined,
      nickname: member.nickname ?? undefined,
      picture: member.image ?? undefined,
      createdAt: member.createdAt.toISOString(),
    },
    workspace: {
      id: role.workspace.id,
      name: role.workspace.name,
    },
    memberRoles: [
      {
        workspaceId: role.workspace.id,
        role: role.role,
        workspaceMemberId: member.id,
      },
    ],
  });
}

export async function getRequestContext(
  authorizationToken: string | null
): Promise<Result<DFRequestContext, RequestContextError>> {
  const { authMode } = config();
  if (authMode === "anonymous") {
    const workspaceId = config().defaultWorkspaceId;

    const workspace = await prisma().workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });
    if (!workspace) {
      return err({
        type: RequestContextErrorType.NotOnboarded,
        message: `Workspace ${workspaceId} not found`,
      });
    }
    return ok({
      workspace: {
        id: workspace.id,
        name: workspace.name,
      },
      member: {
        id: "anonymous",
        email: "anonymous@email.com",
        emailVerified: true,
        createdAt: new Date().toISOString(),
      },
      memberRoles: [
        {
          workspaceId: workspace.id,
          workspaceMemberId: "anonymous",
          role: "Admin",
        },
      ],
    });
  }

  return getMultiTenantRequestContext({
    authorizationToken,
    authProvider: config().authProvider,
  });
}
