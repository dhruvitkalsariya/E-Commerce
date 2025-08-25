import ShopvoraHeader from "@modules/layout/components/shopvora-header"

export default function TestNavigationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopvoraHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Navigation Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Desktop Navigation</h2>
            <p className="text-gray-600">
              Test the dropdown menus on desktop by hovering over categories like "Fashion" and "Electronics".
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Mobile Navigation</h2>
            <p className="text-gray-600">
              Test the mobile menu by resizing your browser to mobile width or using browser dev tools.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Search Suggestions</h2>
            <p className="text-gray-600">
              Test search suggestions by typing in the search bar. You should see recent and popular searches.
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Resize your browser window to test responsive behavior</li>
            <li>Hover over navigation categories to test dropdown menus</li>
            <li>Click on mobile menu button to test mobile navigation</li>
            <li>Type in the search bar to test search suggestions</li>
            <li>Test nested dropdown menus by hovering over items with arrows</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 