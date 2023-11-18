import { prisma, Prisma } from "@/libs/prisma/prismaClient";
import {GRIND_SIZE} from "@/constants/masters/grindSize";

export const grindSize = async () => {
  console.log('grindSize')

  const now = new Date()
  const SEED_DATA: Prisma.ProcessCreateInput[] = GRIND_SIZE.map(
    (grindSize) => ({
      createdAt: now,
      name: grindSize,
    }),
  )

  await prisma.grindSize.deleteMany()
  await prisma.grindSize.createMany({
    data: SEED_DATA,
  })
}
