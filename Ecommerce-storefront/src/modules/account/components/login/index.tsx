"use client"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setShowSuccessPopup(false)

    try {
      const formData = new FormData(e.currentTarget)
      
      console.log("Client: Processing login request")
      console.log("Client: Email present:", !!formData.get("email"))
      console.log("Client: Password present:", !!formData.get("password"))

      const response = await fetch('/api/customer/login', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      console.log("Client: Login response status:", response.status)
      console.log("Client: Login response data:", data)

      if (!response.ok) {
        // API returned an error
        setMessage(data.error || 'Login failed')
      } else if (data.result && typeof data.result === 'string' && data.result.includes('error')) {
        // Login function returned an error string
        setMessage(data.result)
      } else if (data.result && data.result.success) {
        // Successful login
        setShowSuccessPopup(true)
        // Redirect after showing popup
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
      } else {
        // Unexpected response format
        setMessage('Login completed but response format is unexpected')
      }
    } catch (error: any) {
      console.error('Client: Login error:', error)
      setMessage(error.message || 'Network error - please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className="max-w-sm w-full flex flex-col items-center"
        data-testid="login-page"
      >
        <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
        <p className="text-center text-base-regular text-ui-fg-base mb-8">
          Sign in to access an enhanced shopping experience.
        </p>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full gap-y-2">
            <Input
              label="Email"
              name="email"
              type="email"
              title="Enter a valid email address."
              autoComplete="email"
              required
              data-testid="email-input"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              data-testid="password-input"
            />
          </div>
          <ErrorMessage error={message} data-testid="login-error-message" />
          <SubmitButton 
            data-testid="sign-in-button" 
            className="w-full mt-6"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </SubmitButton>
        </form>
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          Not a member?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="underline"
            data-testid="register-button"
          >
            Join us
          </button>
          .
        </span>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Login Successful!
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Welcome back! You will be redirected to the homepage shortly.
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
