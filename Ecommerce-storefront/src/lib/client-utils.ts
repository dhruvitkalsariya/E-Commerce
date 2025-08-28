// Client-safe utility functions that use API routes

export const clientRetrieveCustomer = async () => {
  try {
    const response = await fetch('/api/customer')
    const data = await response.json()
    return data.customer
  } catch (error) {
    console.error('Error retrieving customer:', error)
    return null
  }
}

export const clientUpdateCustomer = async (customerData: any) => {
  try {
    const response = await fetch('/api/customer', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    })
    const data = await response.json()
    return data.customer
  } catch (error) {
    console.error('Error updating customer:', error)
    throw error
  }
}

export const clientRetrieveCart = async () => {
  try {
    const response = await fetch('/api/cart')
    const data = await response.json()
    return data.cart
  } catch (error) {
    console.error('Error retrieving cart:', error)
    return null
  }
}

export const clientAddToCart = async (cartData: any) => {
  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    })
    const data = await response.json()
    return data.cart
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

export const clientUpdateCart = async (cartData: any) => {
  try {
    const response = await fetch('/api/cart', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    })
    const data = await response.json()
    return data.cart
  } catch (error) {
    console.error('Error updating cart:', error)
    throw error
  }
}

export const clientDeleteLineItem = async (lineItemId: string) => {
  try {
    const response = await fetch(`/api/cart?lineItemId=${lineItemId}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    return data.cart
  } catch (error) {
    console.error('Error deleting line item:', error)
    throw error
  }
}

export const clientListCategories = async (query?: Record<string, any>) => {
  try {
    const params = new URLSearchParams()
    if (query?.limit) params.append('limit', query.limit.toString())
    if (query?.handle) params.append('handle', query.handle)
    
    const response = await fetch(`/api/categories?${params.toString()}`)
    const data = await response.json()
    return data.categories || data.category
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export const clientUpdateRegion = async (countryCode: string, currentPath: string) => {
  try {
    const response = await fetch('/api/cart/update-region', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ countryCode, currentPath }),
    })
    const data = await response.json()
    
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl
    }
    
    return data
  } catch (error) {
    console.error('Error updating region:', error)
    throw error
  }
}

export const clientUpdateLineItem = async (lineItemData: any) => {
  try {
    const response = await fetch('/api/cart', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lineItemData),
    })
    const data = await response.json()
    return data.cart
  } catch (error) {
    console.error('Error updating line item:', error)
    throw error
  }
}

export const clientSetShippingMethod = async (shippingData: any) => {
  try {
    const response = await fetch('/api/cart/shipping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shippingData),
    })
    const data = await response.json()
    return data.cart
  } catch (error) {
    console.error('Error setting shipping method:', error)
    throw error
  }
}

export const clientSetAddresses = async (addressData: any) => {
  try {
    const response = await fetch('/api/cart/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    })
    const data = await response.json()
    return data.cart
  } catch (error) {
    console.error('Error setting addresses:', error)
    throw error
  }
}

export const clientInitiatePaymentSession = async (paymentData: any) => {
  try {
    const response = await fetch('/api/cart/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
    const data = await response.json()
    return data.cart
  } catch (error) {
    console.error('Error initiating payment session:', error)
    throw error
  }
}

export const clientPlaceOrder = async (cartId?: string) => {
  try {
    const response = await fetch('/api/cart/place-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartId }),
    })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error placing order:', error)
    throw error
  }
}

export const clientApplyPromotions = async (promotionData: any) => {
  try {
    const response = await fetch('/api/cart/promotions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(promotionData),
    })
    const data = await response.json()
    return data.cart
  } catch (error) {
    console.error('Error applying promotions:', error)
    throw error
  }
}

export const clientSignup = async (formData: FormData) => {
  try {
    if (!formData) {
      console.error("Client signup: formData is null or undefined")
      throw new Error("Form data is required")
    }
    
    console.log("Client signup attempt - formData entries:")
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}: ${key === 'password' ? '[HIDDEN]' : value}`)
    })
    
    const response = await fetch('/api/customer/signup', {
      method: 'POST',
      body: formData,
    })
    
    console.log("Signup response status:", response.status)
    
    const data = await response.json()
    console.log("Signup response data:", data)
    
    if (!response.ok) {
      throw new Error(data.error || 'Signup failed')
    }
    
    return data.result
  } catch (error) {
    console.error('Error during signup:', error)
    throw error
  }
}

export const clientLogin = async (formData: FormData) => {
  try {
    if (!formData) {
      console.error("Client login: formData is null or undefined")
      throw new Error("Form data is required")
    }
    
    console.log("Client login attempt - formData entries:")
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}: ${key === 'password' ? '[HIDDEN]' : value}`)
    })
    
    const response = await fetch('/api/customer/login', {
      method: 'POST',
      body: formData,
    })
    
    console.log("Login response status:", response.status)
    
    const data = await response.json()
    console.log("Login response data:", data)
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed')
    }
    
    return data.result
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const clientSignout = async () => {
  try {
    const response = await fetch('/api/customer/signout', {
      method: 'POST',
    })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error during signout:', error)
    throw error
  }
}

export const clientAddCustomerAddress = async (addressData: any) => {
  try {
    const response = await fetch('/api/customer/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error adding customer address:', error)
    throw error
  }
}

export const clientUpdateCustomerAddress = async (addressData: any) => {
  try {
    const response = await fetch('/api/customer/addresses', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error updating customer address:', error)
    throw error
  }
}

export const clientTransferCart = async () => {
  try {
    const response = await fetch('/api/customer/transfer-cart', {
      method: 'POST',
    })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error transferring cart:', error)
    throw error
  }
}

export const clientCreateTransferRequest = async (formData: FormData) => {
  try {
    const response = await fetch('/api/orders/transfer-request', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error creating transfer request:', error)
    throw error
  }
}

export const clientAcceptTransferRequest = async (id: string, token: string) => {
  try {
    const response = await fetch('/api/orders/accept-transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, token }),
    })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error accepting transfer request:', error)
    throw error
  }
}

export const clientDeclineTransferRequest = async (id: string, token: string) => {
  try {
    const response = await fetch('/api/orders/decline-transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, token }),
    })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error declining transfer request:', error)
    throw error
  }
}

export const clientResetOnboardingState = async (orderId: string) => {
  try {
    const response = await fetch('/api/onboarding/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error resetting onboarding state:', error)
    throw error
  }
}

export const clientCalculatePriceForShippingOption = async (shippingOptionId: string, cartId: string) => {
  try {
    const response = await fetch('/api/fulfillment/calculate-price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shippingOptionId, cartId }),
    })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error calculating shipping price:', error)
    throw error
  }
} 