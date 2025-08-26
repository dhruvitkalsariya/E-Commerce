import { NextRequest, NextResponse } from "next/server"
import { retrieveCart, updateCart, addToCart, deleteLineItem } from "@lib/data/cart"

export async function GET() {
  try {
    const cart = await retrieveCart()
    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Error retrieving cart:", error)
    return NextResponse.json({ cart: null }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const cart = await addToCart(body)
    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const cart = await updateCart(body)
    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lineItemId = searchParams.get('lineItemId')
    
    if (!lineItemId) {
      return NextResponse.json({ error: "Line item ID is required" }, { status: 400 })
    }
    
    const cart = await deleteLineItem(lineItemId)
    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Error deleting line item:", error)
    return NextResponse.json({ error: "Failed to delete line item" }, { status: 500 })
  }
} 