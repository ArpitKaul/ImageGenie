import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20 '>
      <h1>Img.AI</h1>
      <p className='flex-1 border-l  border-gray-400 pl-4 text-sm text-white max-sm:hidden'>Copyright @Img.AI | All right reserved.</p>
      <div className='flex gap-2.5 cursor-pointer '>
        <img src={assets.facebook_icon} alt="" width={35} />
        <img src={assets.twitter_icon} alt="" width={35} />
        <img src={assets.insta} alt="" width={35} />
      </div>
    </div>
  )
}

export default Footer
