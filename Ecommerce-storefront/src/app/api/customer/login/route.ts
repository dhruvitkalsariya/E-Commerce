import { NextRequest, NextResponse } from "next/server"
import { login } from "@lib/data/customer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const result = await login(null, formData)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error during login:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
} 