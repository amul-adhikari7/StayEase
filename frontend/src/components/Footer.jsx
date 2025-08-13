import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer id='footer' className='py-5' style={{ backgroundColor: '#13361C' }}>
      <div className='container text-light'>
        <div className='row gy-4 justify-content-between'>
          {/* Need Help Section */}
          <div className='col-12 col-md-6'>
            <div
              className='help-box p-4 rounded'
              style={{ backgroundColor: 'rgba(210, 144, 98, 0.1)' }}
            >
              <h5 className='mb-3'>Need Help?</h5>
              <div
                className='underline mb-3'
                style={{
                  height: '2px',
                  width: '30px',
                  backgroundColor: '#D29062'
                }}
              />
              <div className='details'>
                <p className='text-light mb-2'>Got Questions? Call us 24/7!</p>
                <p className='mb-0'>
                  <span className='fw-bold' style={{ color: '#D29062' }}>
                    Call Us:
                  </span>
                  <a
                    href='tel:+9779860708090'
                    className='text-light text-decoration-none fw-bold'
                  >
                    (+977) 9860708090
                  </a>
                </p>
              </div>
            </div>

            <div className='contact-info mt-4'>
              <h5 className='mb-3'>Contact Info</h5>
              <div
                className='underline mb-3'
                style={{
                  height: '2px',
                  width: '30px',
                  backgroundColor: '#D29062'
                }}
              />
              <p className='mb-2'>
                <a
                  href='mailto:stayease@gmail.com'
                  className='text-light text-decoration-none'
                >
                  Email: stayease@gmail.com
                </a>
              </p>
              <p className='mb-3'>Location: Kathmandu, Nepal</p>

              <div className='social-links d-flex gap-3'>
                {[
                  'https://facebook.com',
                  'https://instagram.com',
                  'https://twitter.com'
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='social-link d-flex justify-content-center align-items-center rounded-circle'
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'rgba(210, 144, 98, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={e =>
                      (e.currentTarget.style.backgroundColor =
                        'rgba(210, 144, 98, 0.3)')
                    }
                    onMouseOut={e =>
                      (e.currentTarget.style.backgroundColor =
                        'rgba(210, 144, 98, 0.1)')
                    }
                  >
                    {index === 0 && <FaFacebook size={20} />}
                    {index === 1 && <FaInstagram size={20} />}
                    {index === 2 && <FaTwitter size={20} />}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* About Us - Adjusted width */}
          <div className='col-12 col-md-5'>
            <h5 className='mb-3'>About Us</h5>
            <div
              className='underline mb-3'
              style={{
                height: '2px',
                width: '30px',
                backgroundColor: '#D29062'
              }}
            />
            <p className='text-light'>
              StayEase is a premium hotel reservation application designed to
              make your booking experience seamless and enjoyable. We provide
              easy access to the best accommodations across Nepal. Our platform
              ensures secure bookings, competitive rates, and exceptional
              customer service to make your stay truly comfortable.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center mt-5 pt-4 border-top border-secondary'>
          <p className='mb-0 text-light'>
            {new Date().getFullYear()} StayEase &copy; All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
