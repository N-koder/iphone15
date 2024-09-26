import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import {heroVideo , smallHeroVideo} from '../utils';

const Hero = () => {

  
  const [herovideo , setherovideo] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
  
  // for smooth transistion with showing width
  const setherovideofunc =()=>{
    if(window.innerWidth<760) setherovideo(smallHeroVideo);
    else setherovideo(heroVideo)
  }

  useEffect(()=>{
    window.addEventListener('resize' , setherovideofunc);

    // cleaning event listener
    return() => {
      window.removeEventListener('resize' , setherovideofunc); 
    }
  },[])

  // using gsap animation
  useGSAP(()=>{
    // change from current state to new state
    gsap.to('.title' , {opacity:1 , delay : 2.5})

    gsap.to('.actionbutton' , {opacity:1 , delay:2.5 , y : -50})
  },[])

  


  return (
    <section className='w-full nav-height bg-black relative'>
      <div className='w-full h-5/6 flex-center flex-col'>
        <p className='title hero-title'>iPhone 15 Pro</p>

        <div className = 'md:w-10/22 w-9/12'>
          {/* <p className='color-white'>strating</p> */}
          <video className='pointer-events-none' autoPlay muted playsInline={true} key = {herovideo}>
            {/* <p className='color-white'>video</p> */}
            <source src={herovideo} type='video/mp4'/>
          </video>
        
        </div>

      </div>


      {/* buttons */}
      <div className='actionbutton flex flex-col items-center opacity-0 translate-y-21' >
        <a href='#highlight' className='btn'>Buy now</a>
        <p className='text-xl font-normal'>From $199/month or $999</p> 
      </div>
    </section>
  )
}

export default Hero