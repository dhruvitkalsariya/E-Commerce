import { NextRequest, NextResponse } from "next/server"
import { placeOrder } from "@lib/data/cart"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await placeOrder(body.cartId)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error placing order:", error)
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 })
  }
} 