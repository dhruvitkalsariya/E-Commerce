// Client-safe cookie utilities
// These functions work in both client and server environments

export const getAuthHeaders = async (): Promise<
  { authorization: string } | {}
> => {
  // In client environment, we can't access server cookies directly
  // This will be handled by the server-side functions
  return {}
}

export const getCacheTag = async (tag: string): Promise<string> => {
  // In client environment, we can't access server cookies directly
  return ""
}

export const getCacheOptions = async (
  tag: string
): Promise<{ tags: string[] } | {}> => {
  // In client environment, return empty cache options
  return {}
}

export const setAuthToken = async (token: string) => {
  // In client environment, we can't set server cookies directly
  // This should be handled by API routes
  console.warn("setAuthToken called in client environment")
}

export const removeAuthToken = async () => {
  // In client environment, we can't remove server cookies directly
  // This should be handled by API routes
  console.warn("removeAuthToken called in client environment")
}

export const getCartId = async () => {
  // In client environment, we can't access server cookies directly
  return undefined
}

export const setCartId = async (cartId: string) => {
  // In client environment, we can't set server cookies directly
  // This should be handled by API routes
  console.warn("setCartId called in client environment")
}

export const removeCartId = async () => {
  // In client environment, we can't remove server cookies directly
  // This should be handled by API routes
  console.warn("removeCartId called in client environment")
} 