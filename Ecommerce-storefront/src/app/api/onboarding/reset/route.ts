import { NextRequest, NextResponse } from "next/server"
import { resetOnboardingState } from "@lib/data/onboarding"

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()
    const result = await resetOnboardingState(orderId)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error resetting onboarding state:", error)
    return NextResponse.json({ error: "Failed to reset onboarding state" }, { status: 500 })
  }
} 