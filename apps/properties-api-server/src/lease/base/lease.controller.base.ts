/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { LeaseService } from "../lease.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { LeaseCreateInput } from "./LeaseCreateInput";
import { Lease } from "./Lease";
import { LeaseFindManyArgs } from "./LeaseFindManyArgs";
import { LeaseWhereUniqueInput } from "./LeaseWhereUniqueInput";
import { LeaseUpdateInput } from "./LeaseUpdateInput";
import { TenantFindManyArgs } from "../../tenant/base/TenantFindManyArgs";
import { Tenant } from "../../tenant/base/Tenant";
import { TenantWhereUniqueInput } from "../../tenant/base/TenantWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class LeaseControllerBase {
  constructor(
    protected readonly service: LeaseService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Lease })
  @nestAccessControl.UseRoles({
    resource: "Lease",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createLease(@common.Body() data: LeaseCreateInput): Promise<Lease> {
    return await this.service.createLease({
      data: {
        ...data,

        property: data.property
          ? {
              connect: data.property,
            }
          : undefined,

        tenant: data.tenant
          ? {
              connect: data.tenant,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        endDate: true,
        id: true,

        property: {
          select: {
            id: true,
          },
        },

        startDate: true,

        tenant: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Lease] })
  @ApiNestedQuery(LeaseFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Lease",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async leases(@common.Req() request: Request): Promise<Lease[]> {
    const args = plainToClass(LeaseFindManyArgs, request.query);
    return this.service.leases({
      ...args,
      select: {
        createdAt: true,
        endDate: true,
        id: true,

        property: {
          select: {
            id: true,
          },
        },

        startDate: true,

        tenant: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Lease })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Lease",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async lease(
    @common.Param() params: LeaseWhereUniqueInput
  ): Promise<Lease | null> {
    const result = await this.service.lease({
      where: params,
      select: {
        createdAt: true,
        endDate: true,
        id: true,

        property: {
          select: {
            id: true,
          },
        },

        startDate: true,

        tenant: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Lease })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Lease",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateLease(
    @common.Param() params: LeaseWhereUniqueInput,
    @common.Body() data: LeaseUpdateInput
  ): Promise<Lease | null> {
    try {
      return await this.service.updateLease({
        where: params,
        data: {
          ...data,

          property: data.property
            ? {
                connect: data.property,
              }
            : undefined,

          tenant: data.tenant
            ? {
                connect: data.tenant,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          endDate: true,
          id: true,

          property: {
            select: {
              id: true,
            },
          },

          startDate: true,

          tenant: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Lease })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Lease",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteLease(
    @common.Param() params: LeaseWhereUniqueInput
  ): Promise<Lease | null> {
    try {
      return await this.service.deleteLease({
        where: params,
        select: {
          createdAt: true,
          endDate: true,
          id: true,

          property: {
            select: {
              id: true,
            },
          },

          startDate: true,

          tenant: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/tenants")
  @ApiNestedQuery(TenantFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "read",
    possession: "any",
  })
  async findTenants(
    @common.Req() request: Request,
    @common.Param() params: LeaseWhereUniqueInput
  ): Promise<Tenant[]> {
    const query = plainToClass(TenantFindManyArgs, request.query);
    const results = await this.service.findTenants(params.id, {
      ...query,
      select: {
        createdAt: true,
        email: true,
        firstName: true,
        id: true,
        lastName: true,

        lease: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/tenants")
  @nestAccessControl.UseRoles({
    resource: "Lease",
    action: "update",
    possession: "any",
  })
  async connectTenants(
    @common.Param() params: LeaseWhereUniqueInput,
    @common.Body() body: TenantWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      tenants: {
        connect: body,
      },
    };
    await this.service.updateLease({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/tenants")
  @nestAccessControl.UseRoles({
    resource: "Lease",
    action: "update",
    possession: "any",
  })
  async updateTenants(
    @common.Param() params: LeaseWhereUniqueInput,
    @common.Body() body: TenantWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      tenants: {
        set: body,
      },
    };
    await this.service.updateLease({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/tenants")
  @nestAccessControl.UseRoles({
    resource: "Lease",
    action: "update",
    possession: "any",
  })
  async disconnectTenants(
    @common.Param() params: LeaseWhereUniqueInput,
    @common.Body() body: TenantWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      tenants: {
        disconnect: body,
      },
    };
    await this.service.updateLease({
      where: params,
      data,
      select: { id: true },
    });
  }
}
