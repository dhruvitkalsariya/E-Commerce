import { NextRequest, NextResponse } from "next/server"
import { setShippingMethod } from "@lib/data/cart"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const cart = await setShippingMethod(body)
    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Error setting shipping method:", error)
    return NextResponse.json({ error: "Failed to set shipping method" }, { status: 500 })
  }
} 