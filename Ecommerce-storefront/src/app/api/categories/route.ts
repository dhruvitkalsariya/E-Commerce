import { NextRequest, NextResponse } from "next/server"
import { listCategories, getCategoryByHandle } from "@lib/data/categories"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const handle = searchParams.get('handle')
    const limit = searchParams.get('limit')
    
    if (handle) {
      const category = await getCategoryByHandle([handle])
      return NextResponse.json({ category })
    }
    
    const query = limit ? { limit: parseInt(limit) } : undefined
    const categories = await listCategories(query)
    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
} 