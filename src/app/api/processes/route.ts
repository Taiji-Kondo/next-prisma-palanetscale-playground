import { prisma } from '@/libs/prisma/prismaClient';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const processes = await prisma.process.findMany();
    return Response.json({
      status: 200,
      body: {
        processes,
      },
    });
  } catch (error) {
    return Response.json({
      status: 500,
      body: {
        error,
      },
    });
  }
}
