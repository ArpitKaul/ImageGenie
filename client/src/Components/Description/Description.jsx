import React, { useContext } from 'react'
import './Description.css'
import { motion } from 'motion/react'
import { AppContext } from '../../context/AppContext'


const Description = () => {
  const {theme} = useContext(AppContext)
  return (
    <motion.div className='flex flex-col items-center justify-center my-24 p-6 md:px-28 '
    initial={{opacity:0.2 , y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1 , y:0}}
    viewport={{once:true}}
    >
      <h1 className={`text-3xl sm:text-4xl font-semibold mb-2  ${theme.text}`}>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn Your imaginations into visuals</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center '>
        <div className='container mt-8 '>
        <div className='card '></div>
        <div className='bird'></div>
        </div>
        <div className=''>
            <h2 className='text-3xl font-medium max-w-lg mb-4 text-white '>Introducing the AI-Powered Text to Image Generator</h2>
            <p className='text-gray-600 mb-4'>Easily bring your ideas to life with our free AI image generator. whether you need Stunning visuals or unique imagenery , our tool transforms your text into eye-catching images with just a few clicks. Imagine it,decribe it , and watch it come to life instantly.</p>
            <p className='text-gray-600 mb-4 '>Simply type in a text prompt , and our cutting-edge AI will generate high-quality images in seconds . From product visuals to chracter designs and potraits, even concepts that don't yet exits can be visualized effortlessly . powered by advanced AI technology , the creative possibilities are limitless</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
