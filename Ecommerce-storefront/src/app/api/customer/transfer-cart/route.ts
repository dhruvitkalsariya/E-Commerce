import { NextRequest, NextResponse } from "next/server"
import { transferCart } from "@lib/data/customer"

export async function POST(request: NextRequest) {
  try {
    const result = await transferCart()
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error transferring cart:", error)
    return NextResponse.json({ error: "Failed to transfer cart" }, { status: 500 })
  }
} 