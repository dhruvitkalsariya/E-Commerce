import { NextRequest, NextResponse } from "next/server"
import { createTransferRequest } from "@lib/data/orders"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const result = await createTransferRequest(null, formData)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error creating transfer request:", error)
    return NextResponse.json({ error: "Failed to create transfer request" }, { status: 500 })
  }
} 