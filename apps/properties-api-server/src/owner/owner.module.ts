import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { OwnerModuleBase } from "./base/owner.module.base";
import { OwnerService } from "./owner.service";
import { OwnerController } from "./owner.controller";
import { OwnerResolver } from "./owner.resolver";

@Module({
  imports: [OwnerModuleBase, forwardRef(() => AuthModule)],
  controllers: [OwnerController],
  providers: [OwnerService, OwnerResolver],
  exports: [OwnerService],
})
export class OwnerModule {}
