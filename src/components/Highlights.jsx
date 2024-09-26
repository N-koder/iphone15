import gsap from 'gsap'
import React from 'react'
import { useGSAP } from '@gsap/react'
import { rightImg, watchImg } from '../utils'
import VideoCrousel from './VideoCrousel'


const Highlights = () => {
  
  useGSAP(()=>{
    gsap.to('.highlight-title' , {opacity:1 , duration:0.7 , y : 0})
    gsap.to('.link' , {opacity:1 , y:0 , duration:1.7 , stagger:0.27})
  })

  return (
    <section className = "bg-zinc w-screen h-full common-padding overflow-hidden">
      <div className='screen-max-width'>
        <div className='mb-12 items-center justify-between w-full md:flex'>
          <h1 className='highlight-title section-heading'>Catch up the highlights!</h1>

          <div className='watch-film flex flex-wrap items-center gap-3'>
            <p className='link'>Watch the film</p>
            <img src={watchImg} alt="watch-img" className='cursor-pointer'/>

            <p className='link'>Watch the event</p>
            <img src={rightImg} alt="event-img" className='cursor-pointer'/>
          </div>
        
        </div>


        {/* video crousel */}
        <VideoCrousel/>


      </div>
    </section>
  )
}

export default Highlights