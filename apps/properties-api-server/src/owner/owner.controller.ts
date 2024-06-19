import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { OwnerService } from "./owner.service";
import { OwnerControllerBase } from "./base/owner.controller.base";

@swagger.ApiTags("owners")
@common.Controller("owners")
export class OwnerController extends OwnerControllerBase {
  constructor(
    protected readonly service: OwnerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
