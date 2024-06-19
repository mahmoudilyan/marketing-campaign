import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LeaseServiceBase } from "./base/lease.service.base";

@Injectable()
export class LeaseService extends LeaseServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
