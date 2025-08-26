import { NextRequest, NextResponse } from "next/server"
import { signout } from "@lib/data/customer"

export async function POST(request: NextRequest) {
  try {
    const result = await signout()
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error during signout:", error)
    return NextResponse.json({ error: "Failed to signout" }, { status: 500 })
  }
} 