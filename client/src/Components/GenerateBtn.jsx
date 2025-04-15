import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onclickhandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div>
     
      <motion.div
        className='min-h-[400px] flex flex-col justify-center items-center relative pb-16'
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-8'>
          See the magic. Try now
        </h1>
        <button
          onClick={onclickhandler}
          className='px-12 py-3 rounded-full bg-purple-600 text-white hover:scale-105 transition-transform duration-300'
        >
          Generate Images
        </button>
        <img
          src={assets.star_group}
          alt=''
          className='absolute bottom-5 left-5 h-6'
        />
      </motion.div>
    </div>
  );
};

export default GenerateBtn;
