import { prisma, Prisma } from "@/libs/prisma/prismaClient";
import {ROAST} from "@/constants/roast";

export const roast = async () => {
  console.log('roast')

  const now = new Date()
  const SEED_DATA: Prisma.RoastCreateInput[] = ROAST.map((roast) => ({
    createdAt: now,
    name: roast,
  }))

  await prisma.roast.deleteMany()
  await prisma.roast.createMany({
    data: SEED_DATA,
  })
}
