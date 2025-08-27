import React from "react"
import SocialMediaLinks from "@modules/common/components/social-media-links"

export default function TestSocialMediaPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Social Media Icons Test
        </h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Default Size (20px)
            </h2>
            <div className="p-6 bg-gray-50 rounded-lg">
              <SocialMediaLinks />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Large Size (32px)
            </h2>
            <div className="p-6 bg-gray-50 rounded-lg">
              <SocialMediaLinks iconSize={32} />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Small Size (16px)
            </h2>
            <div className="p-6 bg-gray-50 rounded-lg">
              <SocialMediaLinks iconSize={16} />
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Test Instructions:
          </h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Hover over each icon to see hover effects</li>
            <li>• Click on icons to test external links</li>
            <li>• Check that icons scale properly on different sizes</li>
            <li>• Verify accessibility with screen readers</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 