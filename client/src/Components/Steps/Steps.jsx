import React from 'react';
import { stepsData } from '../../assets/assets';

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

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 w-[60rem] text-sm'>
        {stepsData.map((item, index) => (
          <div
            key={index}
            className='w-full h-[350px]'
          >
            <div className='w-full h-full border border-[#2A2A2C] rounded-lg p-6 flex flex-col justify-between bg-gray-900 text-white relative' >
              <div className='flex items-center gap-4'>
                <img className='w-6 relative z-10 text-center' src={item.icon} alt='' />
                <h2 className='text-xl font-medium z-10'>{item.title}</h2>
              </div>
              <p className='text-white z-10'>{item.description}</p>
              <button className='text-purple-600 font-semibold flex items-center gap-1 z-10'>
                Explore More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;


// import React from 'react'
// import {Swiper , SwiperSlide} from "swiper/react";
// import "swiper/css"
// import "swiper/css/pagination";
// import {Pagination} from "swiper/modules";
// import "./steps.css"

// const Steps = () => {
//   return (
//     <div className='container'>
//       <Swiper 
      
//       >

//       </Swiper>
      
//     </div>
//   )
// }

// export default Steps
