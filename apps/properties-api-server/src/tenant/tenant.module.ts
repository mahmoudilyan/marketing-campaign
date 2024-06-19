import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TenantModuleBase } from "./base/tenant.module.base";
import { TenantService } from "./tenant.service";
import { TenantController } from "./tenant.controller";
import { TenantResolver } from "./tenant.resolver";

@Module({
  imports: [TenantModuleBase, forwardRef(() => AuthModule)],
  controllers: [TenantController],
  providers: [TenantService, TenantResolver],
  exports: [TenantService],
})
export class TenantModule {}
