import {prisma} from "@/libs/prisma/prismaClient";
import {NextRequest} from "next/server";

export const dynamic = 'force-dynamic'

export type CreateCoffeeBeanRequestType = {
  name: string
  productionArea?: string
  breed?: string
  taste?: number
  memo?: string
  purchasDate?: string
  userId: number
  roastId?: number
  processId?: number
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const response = await prisma.coffeeBean.create({data: {
      userId: data.userId,
      name: data.name,
      productionArea: data.productionArea,
      breed: data.breed,
      taste: data.taste,
      memo: data.memo,
      purchasDate: data.purchasDate ? new Date(data.purchasDate) : undefined,
      roastId: data.roastId,
      processId: data.processId,
    }})
    return Response.json({
      status: 200,
      body: {
        response,
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