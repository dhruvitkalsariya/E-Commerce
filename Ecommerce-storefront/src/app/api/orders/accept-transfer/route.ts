import { NextRequest, NextResponse } from "next/server"
import { acceptTransferRequest } from "@lib/data/orders"

export async function POST(request: NextRequest) {
  try {
    const { id, token } = await request.json()
    const result = await acceptTransferRequest(id, token)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error accepting transfer request:", error)
    return NextResponse.json({ error: "Failed to accept transfer request" }, { status: 500 })
  }
} 