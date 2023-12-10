import { NextRequest } from 'next/server';

import { prisma } from '@/libs/prisma/prismaClient';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const coffeeBeanId = searchParams.get('coffeeBeanId');
    if (!userId || !coffeeBeanId) throw new Error('userId or coffeeBeanId is not found');

    const coffeeBean = await prisma.coffeeBean.findUnique({
      include: { process: true, roast: true },
      where: { coffeeBeanId: Number(coffeeBeanId), userId: Number(userId) },
    });

    return Response.json({
      body: {
        coffeeBean,
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

export type CreateCoffeeBeanRequestType = {
  name: string;
  note?: string;
  origin?: string;
  processId?: number;
  purchaseDate?: string;
  rating?: number;
  roastId?: number;
  userId: number;
  variety?: string;
};

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as CreateCoffeeBeanRequestType;
    const response = await prisma.coffeeBean.create({
      data: {
        name: data.name,
        note: data.note,
        origin: data.origin,
        processId: data.processId,
        purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : undefined,
        rating: data.rating,
        roastId: data.roastId,
        userId: data.userId,
        variety: data.variety,
      },
    });
    return Response.json({
      body: {
        response,
      },
      status: 201,
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

export type PutCoffeeBeanRequestType = {
  coffeeBeanId: number;
  name: string;
  note?: string;
  origin?: string;
  processId?: number;
  purchaseDate?: string;
  rating?: number;
  roastId?: number;
  userId: number;
  variety?: string;
};

export async function PUT(request: NextRequest) {
  try {
    const data = (await request.json()) as PutCoffeeBeanRequestType;
    const response = await prisma.coffeeBean.update({
      data: {
        name: data.name,
        note: data.note,
        origin: data.origin,
        processId: data.processId,
        purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : undefined,
        rating: data.rating,
        roastId: data.roastId,
        userId: data.userId,
        variety: data.variety,
      },
      where: {
        coffeeBeanId: data.coffeeBeanId,
      },
    });
    return Response.json({
      body: {
        response,
      },
      status: 201,
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

export type DeleteCoffeeBeanRequestType = {
  coffeeBeanId: number;
};

export async function DELETE(request: NextRequest) {
  try {
    const data = (await request.json()) as DeleteCoffeeBeanRequestType;
    const response = await prisma.coffeeBean.delete({
      where: {
        coffeeBeanId: data.coffeeBeanId,
      },
    });
    return Response.json({
      body: {
        response,
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
