import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { LeaseModuleBase } from "./base/lease.module.base";
import { LeaseService } from "./lease.service";
import { LeaseController } from "./lease.controller";
import { LeaseResolver } from "./lease.resolver";

@Module({
  imports: [LeaseModuleBase, forwardRef(() => AuthModule)],
  controllers: [LeaseController],
  providers: [LeaseService, LeaseResolver],
  exports: [LeaseService],
})
export class LeaseModule {}
