import {prisma} from "@/libs/prisma/prismaClient";

export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    const roasts = await prisma.roast.findMany()
    return Response.json({
      status: 200,
      body: {
        roasts,
      },
    })
  } catch (error) {
    return Response.json({
      status: 500,
      body: {
        error,
      },
    })
  }
}