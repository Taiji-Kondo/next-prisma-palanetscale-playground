import { prisma } from "@/libs/prisma/prismaClient";
import { grindSize } from './grindSize'
import { process } from './process'
import { roast } from './roast'
import { user } from './user'

async function main() {
  console.log('-- ⚙️️seed executing --')

  await user()
  await roast()
  await process()
  await grindSize()

  console.log('-- ✅seed finished --')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
