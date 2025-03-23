import React from 'react';
import { stepsData } from '../assets/assets';

const Steps = () => {
  return (
    <div className='flex flex-col mt-48 items-center px-4'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-center text-white'>
        Elevate Your <span className='text-purple-600'>Conversations</span>
      </h1>
      <p className='text-lg text-gray-400 mb-8 text-center'>
        Embracing the Age of Artificial Intelligence. Discover the Boundless <br className='hidden sm:block' />
        Potential and impact of AI in Every Sphere of Life
      </p>

      {/* Updated Container for Better Alignment */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 w-[60rem] text-sm'>
        {stepsData.map((item, index) => (
          <div
            className='border border-[#2A2A2C] rounded-lg p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 h-[350px]' // Added height: h-[250px]
            key={index}
          >
            <div className='flex items-center gap-4 mb-4'>
              <img className='w-6' src={item.icon} alt='' />
              <h2 className='text-xl font-medium text-white'>{item.title}</h2>
            </div>
            <p className='text-gray-400 mb-4'>{item.description}</p>
            <button className='text-purple-600 font-semibold flex items-center gap-1'>
              Explore More 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;