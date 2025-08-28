import { NextRequest, NextResponse } from "next/server"
import { signup } from "@lib/data/customer"

export async function POST(request: NextRequest) {
  try {
    let formData: FormData
    
    // Get the content type
    const contentType = request.headers.get("content-type") || ""
    
    console.log("Signup request received with content-type:", contentType)
    
    // Try to parse the request body based on content type
    if (contentType.includes("multipart/form-data")) {
      formData = await request.formData()
      console.log("Parsed as multipart/form-data")
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await request.text()
      formData = new FormData()
      const params = new URLSearchParams(text)
      formData.append("email", params.get("email") || "")
      formData.append("password", params.get("password") || "")
      formData.append("first_name", params.get("first_name") || "")
      formData.append("last_name", params.get("last_name") || "")
      formData.append("phone", params.get("phone") || "")
      console.log("Parsed as application/x-www-form-urlencoded")
    } else {
      try {
        formData = await request.formData()
        console.log("Parsed as default FormData")
      } catch (error) {
        console.error("Failed to parse request body:", error)
        return NextResponse.json({ 
          error: "Invalid request format. Expected signup data." 
        }, { status: 400 })
      }
    }
    
    // Validate required fields
    const email = formData.get("email")
    const password = formData.get("password")
    const firstName = formData.get("first_name")
    const lastName = formData.get("last_name")
    
    console.log("Email present:", !!email)
    console.log("Password present:", !!password)
    console.log("First name present:", !!firstName)
    console.log("Last name present:", !!lastName)
    
    if (!email || !password || !firstName || !lastName) {
      console.error("Missing required fields")
      return NextResponse.json({ 
        error: "Email, password, first name, and last name are required" 
      }, { status: 400 })
    }
    
    // Call the signup function
    const result = await signup(null, formData)
    
    if (result && typeof result === 'string' && result.includes('error')) {
      console.error("Signup failed:", result)
      return NextResponse.json({ error: result }, { status: 400 })
    }
    
    console.log("Signup successful")
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error during signup:", error)
    return NextResponse.json({ error: "Failed to signup" }, { status: 500 })
  }
} 