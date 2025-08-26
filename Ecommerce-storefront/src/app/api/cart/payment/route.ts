import { NextRequest, NextResponse } from "next/server"
import { initiatePaymentSession } from "@lib/data/cart"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const cart = await initiatePaymentSession(body)
    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Error initiating payment session:", error)
    return NextResponse.json({ error: "Failed to initiate payment session" }, { status: 500 })
  }
} 