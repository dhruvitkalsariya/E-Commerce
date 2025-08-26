import { NextRequest, NextResponse } from "next/server"
import { retrieveCustomer, updateCustomer } from "@lib/data/customer"

export async function GET() {
  try {
    const customer = await retrieveCustomer()
    return NextResponse.json({ customer })
  } catch (error) {
    console.error("Error retrieving customer:", error)
    return NextResponse.json({ customer: null }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const customer = await updateCustomer(body)
    return NextResponse.json({ customer })
  } catch (error) {
    console.error("Error updating customer:", error)
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
  }
} 