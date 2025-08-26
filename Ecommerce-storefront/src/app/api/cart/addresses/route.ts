import { NextRequest, NextResponse } from "next/server"
import { setAddresses } from "@lib/data/cart"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const cart = await setAddresses(body)
    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Error setting addresses:", error)
    return NextResponse.json({ error: "Failed to set addresses" }, { status: 500 })
  }
} 