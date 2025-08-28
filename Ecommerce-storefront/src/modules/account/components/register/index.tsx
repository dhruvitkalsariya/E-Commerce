"use client"

import { useState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
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
      
      console.log("Client: Processing signup request")
      console.log("Client: Email present:", !!formData.get("email"))
      console.log("Client: Password present:", !!formData.get("password"))
      console.log("Client: First name present:", !!formData.get("first_name"))
      console.log("Client: Last name present:", !!formData.get("last_name"))

      const response = await fetch('/api/customer/signup', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      console.log("Client: Signup response status:", response.status)
      console.log("Client: Signup response data:", data)

      if (!response.ok) {
        // API returned an error
        setMessage(data.error || 'Signup failed')
      } else if (data.result && typeof data.result === 'string' && data.result.includes('error')) {
        // Signup function returned an error string
        setMessage(data.result)
      } else if (data.result && typeof data.result === 'object' && data.result.id) {
        // Successful signup - result contains customer object
        setShowSuccessPopup(true)
        // Switch to login view after showing popup
        setTimeout(() => {
          setCurrentView(LOGIN_VIEW.SIGN_IN)
        }, 3000)
      } else {
        // Unexpected response format
        setMessage('Signup completed but response format is unexpected')
      }
    } catch (error: any) {
      console.error('Client: Signup error:', error)
      setMessage(error.message || 'Network error - please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className="max-w-sm flex flex-col items-center"
        data-testid="register-page"
      >
        <h1 className="text-large-semi uppercase mb-6">
          Become a Medusa Store Member
        </h1>
        <p className="text-center text-base-regular text-ui-fg-base mb-4">
          Create your Medusa Store Member profile, and get access to an enhanced
          shopping experience.
        </p>
        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full gap-y-2">
            <Input
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
            <Input
              label="Email"
              name="email"
              required
              type="email"
              autoComplete="email"
              data-testid="email-input"
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              data-testid="phone-input"
            />
            <Input
              label="Password"
              name="password"
              required
              type="password"
              autoComplete="new-password"
              data-testid="password-input"
            />
          </div>
          <ErrorMessage error={message} data-testid="register-error" />
          <span className="text-center text-ui-fg-base text-small-regular mt-6">
            By creating an account, you agree to Medusa Store&apos;s{" "}
            <LocalizedClientLink
              href="/content/privacy-policy"
              className="underline"
            >
              Privacy Policy
            </LocalizedClientLink>{" "}
            and{" "}
            <LocalizedClientLink
              href="/content/terms-of-use"
              className="underline"
            >
              Terms of Use
            </LocalizedClientLink>
            .
          </span>
          <SubmitButton 
            className="w-full mt-6" 
            data-testid="register-button"
          >
            {loading ? 'Creating account...' : 'Join'}
          </SubmitButton>
        </form>
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          Already a member?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="underline"
          >
            Sign in
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
                Account Created Successfully!
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Welcome to Shopvora! You will be redirected to the login page shortly.
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

export default Register
