import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';

const Header = () => {
  const tags = ['abstract', 'nature', 'colorful', 'technology', 'creative', 'food'];

  return (
    <div>
      <motion.div className='flex flex-col justify-center items-center text-center my-4'>
        <h1 className='text-3xl sm:text-7xl sm:max-w-[790px] mx-auto mt-10 text-white'>
          Create beautiful <span className='text-purple-500'>AI Art</span> with Img.ai
        </h1>
        <p className='text-center max-w-xl mx-auto mt-5 text-white'>
          Discover the boundless Potential and Impact of AI in every Sphere of life
        </p>
        <button className='sm:text-lg text-white bg-purple-600 w-auto mt-8 px-12 my-2.5 flex items-center gap-2 rounded-full h-10 cursor-pointer'>
          Generate Images
          <img className='h-6' src={assets.star_group} alt="" />
        </button>
      </motion.div>
      <div className='flex flex-wrap items-center justify-center'> 
        <h1 className='text-white mr-4 text-xl'>Popular Tags:</h1>
        {tags.map((tag) => (
          <button
            key={tag}
            className='sm:text-lg text-white bg-gray-500 bg-opacity-25 px-6 py-2 m-2 rounded-2xl cursor-pointer'
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;