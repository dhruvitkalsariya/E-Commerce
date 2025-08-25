interface CarouselArrowProps {
  direction: 'left' | 'right'
  onClick: () => void
  className?: string
}

const CarouselArrow = ({ direction, onClick, className = '' }: CarouselArrowProps) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group ${className}`}
      style={{
        boxShadow: '0px 0.508728px 2.03491px rgba(0, 0, 0, 0.12)',
        left: direction === 'left' ? '6px' : 'auto',
        right: direction === 'right' ? '6px' : 'auto',
      }}
      aria-label={`${direction === 'left' ? 'Previous' : 'Next'} slide`}
    >
      <div
        className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center"
        style={{
          transform: direction === 'left' ? 'rotate(0deg)' : 'matrix(-1, 0, 0, 1, 0, 0)',
        }}
      >
        <svg
          className="w-4 h-4 md:w-5 md:h-5 text-[#2A1454] group-hover:scale-110 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    </button>
  )
}

export default CarouselArrow 