import { prisma, Prisma } from "@/libs/prisma/prismaClient";
import {PROCESS} from "@/constants/process";

export const process = async () => {
  console.log('process')

  const now = new Date()
  const SEED_DATA: Prisma.ProcessCreateInput[] = PROCESS.map((process) => ({
    createdAt: now,
    name: process,
  }))

  await prisma.process.deleteMany()
  await prisma.process.createMany({
    data: SEED_DATA,
  })
}
