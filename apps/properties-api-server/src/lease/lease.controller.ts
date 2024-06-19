import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LeaseService } from "./lease.service";
import { LeaseControllerBase } from "./base/lease.controller.base";

@swagger.ApiTags("leases")
@common.Controller("leases")
export class LeaseController extends LeaseControllerBase {
  constructor(
    protected readonly service: LeaseService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
