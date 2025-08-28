import { NextRequest, NextResponse } from "next/server"
import { login } from "../../../../lib/data/customer"

export async function POST(request: NextRequest) {
  try {
    let formData: FormData
    
    // Get the content type
    const contentType = request.headers.get("content-type") || ""
    
    console.log("Login request received with content-type:", contentType)
    
    // Try to parse the request body based on content type
    if (contentType.includes("multipart/form-data")) {
      // Handle FormData
      formData = await request.formData()
      console.log("Parsed as multipart/form-data")
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      // Handle URL encoded form data
      const text = await request.text()
      formData = new FormData()
      const params = new URLSearchParams(text)
      formData.append("email", params.get("email") || "")
      formData.append("password", params.get("password") || "")
      console.log("Parsed as application/x-www-form-urlencoded")
    } else if (contentType.includes("application/json")) {
      // Handle JSON data
      const jsonData = await request.json()
      formData = new FormData()
      formData.append("email", jsonData.email || "")
      formData.append("password", jsonData.password || "")
      console.log("Parsed as application/json")
    } else {
      // Default: try to parse as FormData
      try {
        formData = await request.formData()
        console.log("Parsed as default FormData")
      } catch (error) {
        // If that fails, try to parse as text
        try {
          const text = await request.text()
          formData = new FormData()
          
          // Try to parse as URLSearchParams
          const params = new URLSearchParams(text)
          formData.append("email", params.get("email") || "")
          formData.append("password", params.get("password") || "")
          console.log("Parsed as text then URLSearchParams")
        } catch (parseError) {
          console.error("Failed to parse request body:", parseError)
          return NextResponse.json({ 
            error: "Invalid request format. Expected email and password." 
          }, { status: 400 })
        }
      }
    }
    
    // Validate that we have the required fields
    const email = formData.get("email")
    const password = formData.get("password")
    
    console.log("Email present:", !!email)
    console.log("Password present:", !!password)
    
    if (!email || !password) {
      console.error("Missing required fields - email:", !!email, "password:", !!password)
      return NextResponse.json({ 
        error: "Email and password are required" 
      }, { status: 400 })
    }
    
    // Call the login function
    const result = await login(null, formData)
    
    if (result && typeof result === 'string' && result.includes('error')) {
      console.error("Login failed:", result)
      return NextResponse.json({ error: result }, { status: 400 })
    }
    
    console.log("Login successful")
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error during login:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
} 