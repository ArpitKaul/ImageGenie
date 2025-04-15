import React from 'react'
import { assets } from '../../assets/assets'
import './Card2.css'
const Card2 = () => {
  return (
   <div className='cardes'>
         <div className='wrapper'>
           <img className='cover-image' src={assets.cover1} alt="" />
         </div>
         <img className='title' src={assets.title1} alt="" />
         <img className='chracter' src={assets.chrac1} alt="" />
       </div>
  )
}

export default Card2
