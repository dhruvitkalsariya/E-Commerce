import { NextRequest, NextResponse } from "next/server"
import { addCustomerAddress, updateCustomerAddress } from "@lib/data/customer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await addCustomerAddress(body)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error adding customer address:", error)
    return NextResponse.json({ error: "Failed to add address" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await updateCustomerAddress(body)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error updating customer address:", error)
    return NextResponse.json({ error: "Failed to update address" }, { status: 500 })
  }
} 