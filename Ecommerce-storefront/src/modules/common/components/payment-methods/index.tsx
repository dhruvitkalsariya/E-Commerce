import React from "react"
import Image from "next/image"

interface PaymentMethodsProps {
  className?: string
  iconSize?: number
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  className = "",
  iconSize = 24,
}) => {
  // Only 2 icons in top row, 2 in bottom row
  const paymentMethodsTop = [
    {
      name: "Visa",
      icon: "/assets/Shopvora/pay-methods-images/Visa.svg",
      width: 62,
      height: 20,
    },
    {
      name: "Mastercard",
      icon: "/assets/Shopvora/pay-methods-images/Mastercard.svg",
      width: 43,
      height: 26,
    },
  ]

  const paymentMethodsBottom = [
    {
      name: "American Express",
      icon: "/assets/Shopvora/pay-methods-images/Amex.svg",
      width: 47,
      height: 26,
    },
    {
      name: "PayPal",
      icon: "/assets/Shopvora/pay-methods-images/Paypal.svg",
      width: 75,
      height: 22,
    },
  ]

  return (
    <div className={`flex flex-col items-start gap-3 ${className}`}>
      {/* Top Payment Methods Row */}
      <div className="flex items-center gap-5">
        {paymentMethodsTop.map((method) => (
          <div
            key={method.name}
            className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
            title={method.name}
          >
            <Image
              src={method.icon}
              alt={method.name}
              width={method.width}
              height={method.height}
              className="object-contain"
            />
          </div>
        ))}
      </div>
      {/* Bottom Payment Methods Row */}
      <div className="flex items-center gap-5 mt-2">
        {paymentMethodsBottom.map((method) => (
          <div
            key={method.name}
            className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
            title={method.name}
          >
            <Image
              src={method.icon}
              alt={method.name}
              width={method.width}
              height={method.height}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentMethods