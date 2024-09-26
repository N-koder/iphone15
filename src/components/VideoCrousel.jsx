import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


const VideoCrousel = () => {

    // making references for tracking video-on/off
    const videoref = useRef([]);
    const videodivref = useRef([]);
    const videospanref = useRef([]);

    const [video , setvideo] = useState({
        video_id : 0,
        start_play :false,
        is_end : false,
        is_last_video : false,
        is_playing : false
    })

    // destructing
    const {video_id , start_play , is_end , is_last_video , is_playing} = video;

    const [loadedVideo , setloadedVideo] = useState([]);

    // is video playing
    useEffect (() => {
        if(loadedVideo.length > 3){
            if(!is_playing){
                videoref.current[video_id].pause();
            }else{
                start_play && videoref.current[video_id].play();
            }

        }

    }, [video_id , start_play , is_playing , loadedVideo])

    // progess bar for highlight video
    useEffect(()=>{
        let currentProgess = 0;

        // current playing video_span
        let span = videospanref.current;

        // animate the progress
        if(span[video_id]){
            let animatebar = gsap.to(span[video_id] , {
                onUpdate:()=>{
                    const progress = Math.ceil(animatebar.progress() * 100);

                    if(progress != currentProgess){
                        currentProgess = progress;

                        gsap.to(videodivref.current[video_id] , {
                            width : window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
                        })


                        gsap.to(span[video_id] , {
                            width : `${currentProgess}%`,
                            backgroundColor: 'white'
                        })
                    }
                },

                onComplete : ()=> {
                    if(is_playing){
                        gsap.to(videodivref.current[video_id] , {
                            width: '12px'
                        })

                        gsap.to(span[video_id] , {
                            backgroundColor : '#afafaf'
                        })
                    }
                }
            })


            if(video_id === 0) {
                animatebar.restart();
            }
            

            const animationUpdate = () => {
                animatebar.progress(videoref.current[video_id].currentTime / hightlightsSlides[video_id].videoDuration)
            }
    
            if(is_playing){
                gsap.ticker.add(animationUpdate);
            }else{
                gsap.ticker.remove(animationUpdate);
            }

        }

       



    },[video_id , start_play])


    // using GSAP for animate slide down dots
    useGSAP(() => {

        gsap.to('.slider' , {
            transform : `translateX(${-100 * video_id}%)`,
            duration: 2,
            ease : 'power2.inOut'
        }) 

        gsap.to('#slide-video' , {
            scrollTrigger : {
                trigger : "#slide-video",
                toggleActions : 'restart none none none',
            },

            onComplete : () => {
                setvideo((prev_video) => ({...prev_video , start_play : true , is_playing :true}));
            }

        })
    }, [is_end , video_id])


    const HandleLoadedData = (e , i) => setloadedVideo((prev_video) => [...prev_video , e])
    



    const HandleVideoProcess = (type , i) => {
        switch (type) {
            case 'video-end':
                setvideo((prev_video) => ({...prev_video , is_end:true , video_id : i+1}))
                break;
            
            case 'video-reset':
                setvideo((prev_video) => ({...prev_video , is_end:false , video_id : 0}));
                break;
            
            case 'play' : 
                setvideo((prev_video) => ({...prev_video , is_playing : !prev_video.is_playing}));
                break;
            
            case 'video-last':
                setvideo((prev_video) => ({...prev_video , is_last_video:true}))    
                break;
            case 'pause' :
                setvideo((prev_video) => ({...prev_video , is_playing : !prev_video.is_playing}));
                break;
            default:
                return video;
        }
    }



    return (
        <>
        <div className='flex items-center'>
            {hightlightsSlides.map((slide ,key) => (
                <div key = {key} className='slider sm:pr-20 pr-10'>
                    <div className='video-carousel_container'>
                        {/* crousel videos */}
                        <div className='w-full bg-black rounded-3xl h-full flex-center overflow-hidden'>
                            <video id='slide-video' playsInline={true} preload='auto' muted

                                className={`${slide.id === 2 && 'translate-x-44'} pointer-event-none`}

                                ref={(el) => (videoref.current[key] = el)}
                                onPlay={() => {
                                    setvideo((prev_video)=>({
                                        ...prev_video , is_playing:true
                                    }))
                                }}

                                onLoadedMetadata={(e) => HandleLoadedData(e ,key)}

                                onEnded={() => 
                                    key != 3 ? HandleVideoProcess('video-end',key) : HandleVideoProcess('video-last')
                                }
                            >
                                <source src={slide.video} type='video/mp4'></source>
                            </video>
                        
                        </div>
                        
                        {/* crousel text */}
                        <div className="z-10 absolute top-12 left-[5%]">
                            {slide.textLists.map((crousel_text , key) => (
                                <p key = {key} className='text-xl font-medium md:text-2xl '>{crousel_text}</p>
                            ))}
                        </div>
                    </div>
                    
                </div>
            ))}
            
        </div>

        {/*  progress bar and pause play button */}
        <div className='relative flex-center mt-9'>
            <div className='bg-gray-300 flex-center rounded-full px-7 py-5 backdrop-blur'>
                {/* <p className='text-white'>Hello</p> */}
                {/* four videos */}
                {videoref.current.map((_,i) => (
                    <span 
                        key = {i}
                        ref = {(el) => (videodivref.current[i] = el)}
                        className='bg-white rounded-full mx-3 w-3 h-3 cursor-pointer relative'
                    >
                        {/* each video's progress bar */}
                        <span  
                            ref={(el) => (videospanref.current[i] = el)}
                            className='absolute w-full h-full rounded-full' 
                        />
                    </span>
                    
                ))}
            </div>

            {/* play pause button */}
            <button className='control-btn'>
                <img 
                    src = {is_last_video ? replayImg : !is_playing ? playImg : pauseImg}
                    alt = {is_last_video ? 'replay' : !is_playing ? 'play' : 'pause'}

                    onClick={is_last_video ? ()=>HandleVideoProcess('video-reset') : !is_playing ? ()=>HandleVideoProcess('play') : () => HandleVideoProcess('pause')}
                />
            </button>

        </div>

        </>

        
    )
}

export default VideoCrousel