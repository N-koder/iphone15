import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { animatewithGsap } from '../utils/animates.js';
import { explore1Img, explore2Img, exploreVideo } from '../utils';

const Features = () => {

  const videoref = useRef();

  useGSAP(()=>{
    // gsap.to('#featurestitle' , { y: 0 , opacity: 1})
    animatewithGsap('#featurestitle' , {y : 0 ,opacity : 1})
    animatewithGsap('.g_grow' , {scale : 1 , opacity : 1 , ease : 'power1'}, {scrub : 5.5})
    
    // gsap.to('.about' , {y : 0 , opacity : 1 , ease : 'power2.inOut', duration :1});
    animatewithGsap('.about' , {y : 0 , opacity : 1 , ease : 'power2.inOut', duration :1})


      gsap.to('#featuresvideo' , {
        scrollTrigger : {
          trigger : '#featuresvideo' ,
          toogleActions : 'play pause reverse restart',
          start  : '-10% bottom',
      },
      onComplete : () => {
        videoref.current.play();
      }
    } )
  } , []);

  return (
    <section className='common-padding h-full bg-zinc overflow-hidden relative'>
      <div className='screeen-max-width'>
        <div className='mb-12 w-full'>
          <h1 id='featurestitle' className='section-heading'>Explore the full story.</h1>
        </div>

        <div className='flex flex-col justify-center items-center overflow-hidden'>
          <div className='mt-32 mb-24 pl-24'>
            <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone.</h2>
            <h2 className='text-5xl lg:text-7xl font-semibold'>Forged in Titanium ;)</h2>
          </div>


          <div className='flex-center flex-col sm:px-10'>
            <div className='relative h-[50vh] w-full flex items-center'>
              <video playsInline id="featuresvideo" className='w-full h-full object-cover object-center' preload='none' muted autoPlay ref = {videoref}>
                <source src = {exploreVideo} type = "video/mp4" />
              </video>
            </div>


            <div className='flex flex-col w-full relative'>
              <div className='feature-video-container'>
                <div className='overflow-hidden flex-1 h-[50vh]'>
                  <img src= {explore1Img} alt='titanium1' className='feature-video g_grow'/>
                </div>
                <div className='overflow-hidden flex-1 h-[50vh]'>
                  <img src= {explore2Img} alt='titanium2' className='feature-video g_grow'/>
                </div> 
              </div>

              <div className='feature-text-container'>
                <div className='flex-1 flex-center'>
                  <p id='featurestext' className='about feature-text'>iphone15 Pro is {' '} <span className='text-white'>the first iphone to feature an aerospace-grade titanium design</span>, using the same alloy that spacecrafts use for mission to Mars</p>

                </div>

                <div className='flex-1 flex-center'>
                  
                  <p id='featurestext' className='about feature-text'>Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '} <span className='text-white'>Lightest Pro models ever.</span> You'll notice the difference the moment you pick one up.</p>
                </div>

                
              </div>
            </div>
          </div>
        </div>

        

      </div>
    </section>
  )
}

export default Features