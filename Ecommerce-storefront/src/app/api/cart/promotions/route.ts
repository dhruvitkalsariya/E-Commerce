import { NextRequest, NextResponse } from "next/server"
import { applyPromotions } from "@lib/data/cart"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const cart = await applyPromotions(body)
    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Error applying promotions:", error)
    return NextResponse.json({ error: "Failed to apply promotions" }, { status: 500 })
  }
} 