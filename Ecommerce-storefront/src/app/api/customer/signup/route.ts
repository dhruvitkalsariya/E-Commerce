import { NextRequest, NextResponse } from "next/server"
import { signup } from "@lib/data/customer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const result = await signup(null, formData)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error during signup:", error)
    return NextResponse.json({ error: "Failed to signup" }, { status: 500 })
  }
} 