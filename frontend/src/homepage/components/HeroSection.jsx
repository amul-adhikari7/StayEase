import React from 'react'

const HeroSection = ({ userLocation, loadingLocation, handleAskLocation }) => {
  return (
    <section className='hero-section'>
      <div className='container mx-auto px-4 py-16'>
        <h1 className='text-5xl font-bold text-white mb-6'>
          The Perfect Combination of Luxury and Comfort
        </h1>
        <p className='text-xl text-white/90 mb-12'>
          Discover comfortable and luxurious hotels in Kathmandu
        </p>

        {userLocation === null && (
          <button
            onClick={handleAskLocation}
            disabled={loadingLocation}
            className='location-btn'
          >
            {loadingLocation ? (
              <span className='flex items-center justify-center'>
                <div className='loading-spinner mr-3' />
                Finding hotels near you...
              </span>
            ) : (
              'Find Hotels Near Me 📍'
            )}
          </button>
        )}
      </div>
    </section>
  )
}

export default HeroSection
