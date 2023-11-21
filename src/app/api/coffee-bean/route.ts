import {prisma} from "@/libs/prisma/prismaClient";
import {NextRequest} from "next/server";

export const dynamic = 'force-dynamic'

export type CreateCoffeeBeanRequestType = {
  name: string
  origin?: string
  variety?: string
  rating?: number
  note?: string
  purchaseDate?: string
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
      origin: data.origin,
      variety: data.variety,
      rating: data.rating,
      note: data.note,
      purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : undefined,
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