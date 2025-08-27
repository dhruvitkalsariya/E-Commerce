import React from "react"

interface TwitterIconProps {
  className?: string
  size?: number
}

const TwitterIcon: React.FC<TwitterIconProps> = ({ 
  className = "", 
  size = 18 
}) => {
  return (
    <svg 
      width={size} 
      height={size * 1.056} 
      viewBox="0 0 18 19" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M10.8791 8.53782L17.4326 0.919922H15.8796L10.1892 7.5344L5.64432 0.919922H0.402344L7.27509 10.9222L0.402344 18.9107H1.95539L7.96455 11.9255L12.7643 18.9107H18.0063L10.8791 8.53782ZM8.75195 11.0103L8.05565 10.0143L2.51498 2.08903H4.90036L9.37175 8.48502L10.0681 9.48102L15.8803 17.7947H13.495L8.75195 11.0103Z" 
        fill="currentColor"
      />
    </svg>
  )
}

export default TwitterIcon 