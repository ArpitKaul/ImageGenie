import React from 'react'

import Header from '../Components/Header'
import Slider from '../Components/Slider/Slider'
import Steps from '../Components/Steps/Steps'
import Testimonials from '../Components/Testimonials'
import GenerateBtn from '../Components/GenerateBtn'
import Description from '../Components/Description/Description'

const Home = () => {
  return (
    <div>
      <Header/>
      <Slider/>
      <Steps/>
      <Description/>
      <Testimonials/>
      <GenerateBtn/>
    </div>
  )
}

export default Home
