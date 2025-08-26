import { NextRequest, NextResponse } from "next/server"
import { declineTransferRequest } from "@lib/data/orders"

export async function POST(request: NextRequest) {
  try {
    const { id, token } = await request.json()
    const result = await declineTransferRequest(id, token)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error declining transfer request:", error)
    return NextResponse.json({ error: "Failed to decline transfer request" }, { status: 500 })
  }
} 