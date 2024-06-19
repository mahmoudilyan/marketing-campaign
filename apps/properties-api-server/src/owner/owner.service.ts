import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OwnerServiceBase } from "./base/owner.service.base";

@Injectable()
export class OwnerService extends OwnerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
