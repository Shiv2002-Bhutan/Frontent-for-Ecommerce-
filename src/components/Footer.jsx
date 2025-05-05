import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <div>
      <div className='flex flex-col md:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-small mt-40'>
            <div>
            <span className="font-extrabold text-3xl text-black">Trendigo</span>
                <p className='w-full md:2/3 text-gray-600'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>
                    COMPANY
                </p>
                <ul className='flex flex-col gap-1 text-gray-600 '>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+97577441715</li>
                    <li>forever@forever.com</li>
                    <li>FAQs</li>
                    <li>Terms & Conditions</li>
                </ul>
            </div>
        </div>
        
          <div>
            <hr className='border-gray-300' />
            <p className='text-center text-gray-500 text-sm'>
                &copy; {year} Forever. All rights reserved.
            </p>
          </div>
    </div>
  )
}

export default Footer
