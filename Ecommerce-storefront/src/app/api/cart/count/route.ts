import { NextResponse } from "next/server"
import { retrieveCart } from "@lib/data/cart"

export async function GET() {
  try {
    // Get cart from Medusa.js backend
    const cart = await retrieveCart().catch(() => null)
    
    // Calculate total items in cart
    let count = 0
    if (cart && cart.items) {
      count = cart.items.reduce((total, item) => total + (item.quantity || 0), 0)
    }

    return NextResponse.json({ count })
  } catch (error) {
    console.error("Error fetching cart count:", error)
    // Return fallback count if there's an error
    return NextResponse.json({ count: 10 })
  }
} 