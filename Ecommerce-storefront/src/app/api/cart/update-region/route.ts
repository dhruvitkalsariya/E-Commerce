import { NextRequest, NextResponse } from "next/server"
import { updateRegion } from "@lib/data/cart"

export async function POST(request: NextRequest) {
  try {
    const { countryCode, currentPath } = await request.json()
    
    if (!countryCode || !currentPath) {
      return NextResponse.json({ error: "Country code and current path are required" }, { status: 400 })
    }
    
    // This will redirect, so we need to handle it differently
    // For now, we'll just return the new URL
    const newUrl = `/${countryCode}${currentPath}`
    
    return NextResponse.json({ redirectUrl: newUrl })
  } catch (error) {
    console.error("Error updating region:", error)
    return NextResponse.json({ error: "Failed to update region" }, { status: 500 })
  }
} 