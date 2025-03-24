import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  stepsData } from '../../assets/assets';

const Steps = () => {
  const [flippedCards, setFlippedCards] = useState(Array(stepsData.length).fill(false));

  const handleFlip = (index) => {
    setFlippedCards((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };

  return (
    <div className='flex flex-col mt-48 items-center px-4'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-center text-white'>
        Elevate Your <span className='text-purple-600'>Conversations</span>
      </h1>
      <p className='text-lg text-gray-400 mb-8 text-center'>
        Embracing the Age of Artificial Intelligence. Discover the Boundless <br className='hidden sm:block' />
        Potential and impact of AI in Every Sphere of Life
      </p>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 w-[60rem] text-sm'>
        {stepsData.map((item, index) => (
          <div
            key={index}
            className='flip-card w-full h-[350px] cursor-pointer'
            onClick={() => handleFlip(index)}
          >
            <motion.div
              className='flip-card-inner w-full h-full relative'
              initial={false}
              animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Front Side */}
              <div className='flip-card-front w-full h-full border border-[#2A2A2C] rounded-lg p-6 flex flex-col justify-between bg-gray-900 text-white absolute' >
                <div className='flex items-center gap-4'>
                  <img className='w-6 relative z-10 text-center' src={item.icon} alt='' />
                  <h2 className='text-xl font-medium z-10'>{item.title}</h2>
                </div>
                <p className='text-white z-10'>{item.description}</p>
                <button className='text-purple-60 font-semibold flex items-center gap-1 z-10'>
                  Explore More
                </button>
              </div>

              {/* Back Side */}
              <div className='flip-card-back w-full h-full border border-[#2A2A2C] rounded-lg p-6 flex items-center justify-center bg-purple-60 text-white absolute'
               style={{
                backgroundImage: `url(${item.image})`, // Set background image
                backgroundSize: 'cover', // Cover the whole card
                backgroundPosition: 'center', // Center the image
                backgroundRepeat: 'no-repeat', // Prevent repetition
                position: 'relative' 
              }}>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
