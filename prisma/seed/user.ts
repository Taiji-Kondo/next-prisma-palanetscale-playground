import { PrismaClient, Prisma } from "@/libs/prisma/prismaClient";

const prisma = new PrismaClient()

export const user = async () => {
  console.log('user')

  const now = new Date()
  const SEED_DATA: Prisma.UserCreateInput[] = [
    {
      createdAt: now,
      name: 'Admin',
    },
    {
      createdAt: now,
      name: 'Taiji Kondo',
    },
    {
      createdAt: now,
      name: 'Ayaka Uchida',
    },
  ]

  await prisma.user.deleteMany()
  await prisma.user.createMany({
    data: SEED_DATA,
  })
}
