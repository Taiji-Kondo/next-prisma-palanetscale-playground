import { prisma } from '@/libs/prisma/prismaClient';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const processes = await prisma.process.findMany();
    return Response.json({
      body: {
        processes,
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
