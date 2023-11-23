import { prisma } from '@/libs/prisma/prismaClient';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const roasts = await prisma.roast.findMany();
    return Response.json({
      body: {
        roasts,
      },
      status: 200,
    });
  } catch (error) {
    return Response.json({
      body: {
        error,
      },
      status: 500,
    });
  }
}
