import { NextRequest, NextResponse } from "next/server"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"

export async function POST(request: NextRequest) {
  try {
    const { shippingOptionId, cartId } = await request.json()
    const result = await calculatePriceForShippingOption(shippingOptionId, cartId)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error calculating shipping price:", error)
    return NextResponse.json({ error: "Failed to calculate shipping price" }, { status: 500 })
  }
} 