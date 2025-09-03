import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
// import Clock from './clock/Clock';

const Header = () => {
  const { user, setShowLogin, theme } = useContext(AppContext);
  const navigate = useNavigate();

  const onclickhandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  const tags = ['abstract', 'nature', 'colorful', 'technology', 'creative', 'food'];

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center text-center my-4 mt-9">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.h1
            className="text-3xl sm:text-7xl sm:max-w-[790px] text-white ml-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
          >
            Create beautiful <span className={theme.text}>AI Art</span> with Img.ai
          </motion.h1>

          {/* ⏰ Clock component side-by-side with heading */}
          {/* <div className=" sm:mt-0 ml-8">
            < Clock/>
          </div> */}
        </div>

        <motion.p
          className="text-center max-w-xl mx-auto mt-5 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Discover the boundless Potential and Impact of AI in every Sphere of life
        </motion.p>

        <motion.button
          onClick={onclickhandler}
          className="sm:text-lg text-white bg-purple-600 w-auto mt-8 px-12 my-2.5 flex items-center gap-2 rounded-full h-10 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ opacity: { delay: 0.2, duration: 0.5 } }}
        >
          Generate Images
          <img className="h-6" src={assets.star_group} alt="" />
        </motion.button>
      </div>

      <div className="flex flex-wrap items-center justify-center">
        <h1 className="text-white mr-4 text-xl font-sans">Popular Tags:</h1>
        {tags.map((tag) => (
          <motion.button
            key={tag}
            className="sm:text-lg text-black font-serif bg-white bg-opacity-25 px-6 py-2 m-2 rounded-2xl cursor-pointer"
            whileHover={{ scale: 1.1, backgroundColor: '#9333ea', color: '#ffffff' }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Header;
