import React from 'react';
import { assets } from '../../assets/assets';
import './Slider.css';

const Slider = () => {
  return (
    <div className='banner mt-16'>
      <div className='slider' style={{ '--quantity': 7 }}>
        <div className='item' style={{ '--position': 1 }}><img src={assets.ai} alt="" /></div>
        <div className='item' style={{ '--position': 2 }}><img src={assets.ai1} alt="" /></div>
        <div className='item' style={{ '--position': 3 }}><img src={assets.ai2} alt="" /></div>
        <div className='item' style={{ '--position': 4 }}><img src={assets.ai3} alt="" /></div>
        <div className='item' style={{ '--position': 5 }}><img src={assets.ai4} alt="" /></div>
        <div className='item' style={{ '--position': 6 }}><img src={assets.ai5} alt="" /></div>
        <div className='item' style={{ '--position': 7 }}><img src={assets.ai6} alt="" /></div>
      </div>
      <div className='content'>
        <h1 data-content="AI ONLY ">
            AI ONLY
        </h1>
        <div className="model ">
            <img className='h-96 w-96 ml-[30rem] justify-between' src={assets.model} alt="" />
        </div>
       
      </div>
    </div>
  );
};

export default Slider;
