import React from 'react'
import { assets } from '../../assets/assets'
import './Card1.css'

const Card1 = () => {
  return (
    <div className='cardes'>
      <div className='wrapper'>
        <img className='cover-image' src={assets.cover} alt="" />
      </div>
      <img className='title' src={assets.title} alt="" />
      <img className='chracter' src={assets.chrac} alt="" />
    </div>
  )
}

export default Card1
