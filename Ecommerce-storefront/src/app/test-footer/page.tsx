import React from "react"
import Footer from "@modules/layout/templates/footer"

export default function TestFooterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Content to push footer down */}
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Footer Test Page
        </h1>
        
        <div className="space-y-8">
          <div className="p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Footer Components Test
            </h2>
            <p className="text-blue-800">
              This page displays the complete footer with all components:
            </p>
            <ul className="text-blue-800 mt-2 space-y-1">
              <li>• Customer Service links</li>
              <li>• About links</li>
              <li>• Quick Links</li>
              <li>• Payment method icons (Visa, Mastercard, AMEX, PayPal)</li>
              <li>• Copyright and language selector</li>
              <li>• Social media icons (YouTube, Twitter, Facebook, LinkedIn)</li>
            </ul>
          </div>
          
          <div className="p-6 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Test Instructions:
            </h3>
            <ul className="text-green-800 space-y-1">
              <li>• Scroll down to see the footer</li>
              <li>• Test hover effects on all links</li>
              <li>• Click the language selector dropdown</li>
              <li>• Hover over payment method icons</li>
              <li>• Test social media icon interactions</li>
              <li>• Verify responsive behavior on different screen sizes</li>
            </ul>
          </div>
          
          <div className="p-6 bg-yellow-50 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              Design Verification:
            </h3>
            <ul className="text-yellow-800 space-y-1">
              <li>• Background color: #F3F3F3</li>
              <li>• Typography: Inter font family</li>
              <li>• Colors match Figma design exactly</li>
              <li>• Spacing and layout match 1440px design</li>
              <li>• Responsive breakpoints working</li>
            </ul>
          </div>
        </div>
        
        {/* Add some content to push footer down */}
        <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg mt-8">
          <p className="text-gray-600 text-lg">
            Scroll down to see the footer ↓
          </p>
        </div>
      </div>
      
      {/* Footer will be rendered here */}
      <Footer />
    </div>
  )
} 