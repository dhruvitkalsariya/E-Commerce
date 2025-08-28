"use client"

import { useState } from 'react'
import { login } from '@lib/data/customer'

export default function TestLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)

      console.log('Submitting login with:')
      console.log('Email:', email)
      console.log('Password length:', password.length)

      const response = await login(null, formData)
      setResult({ success: true, data: response })
    } catch (error: any) {
      setResult({ success: false, error: error.message || error.toString() })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Test Login</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Test Login'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 rounded-md">
          {result.success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded">
              <h3 className="font-bold">Success!</h3>
              <pre className="mt-2 text-sm">{JSON.stringify(result.data, null, 2)}</pre>
            </div>
          ) : (
            <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
              <h3 className="font-bold">Error!</h3>
              <p className="mt-2">{result.error}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600">
        <p>Check the browser console for detailed debugging information.</p>
      </div>
    </div>
  )
} 