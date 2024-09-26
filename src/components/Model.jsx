import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import ModelsView from './ModelsView'
import { yellowImg } from '../utils'

import * as three from 'three';
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'

import {models, sizes} from '../constants';

import {gsaptimeline} from '../utils/animates'

const Model = () => {

    const [size, setsize] = useState('small');
    const [phonemodel , setphonemodel] = useState({
        title : 'iphone15 pro in Natural titanium',
        color : ['#8F8A81' , '#6F6C64' , '#FFE7B9'],
        img : yellowImg
    })


    // keep track of camera control for viewing model
    const cameraforsmall = useRef();
    const cameraforlarge = useRef();

    // keep track of model to access model properties when animating
    const smallmodel = useRef(new three.Group());
    const largemodel = useRef(new three.Group());

    // keep track of rotation of model
    const [smallmodelrotation , setsmallmodelrotation] = useState(0);
    const [largemodelrotation , setlargemodelrotation] = useState(0);




    useGSAP(()=>{
        gsap.to('#heading' , {y : 0 , opacity:1})
    },[]);

    // changing model with size

    const timelinesmodelsize = gsap.timeline();

    useEffect(()=>{
        if(size === 'large'){
            gsaptimeline(timelinesmodelsize , smallmodel , smallmodelrotation , '#view1' , '#view2' , {
                transform : 'translateX(-100%)',
                duration : 2.5
            });
        }
        if(size === 'small'){
            gsaptimeline(timelinesmodelsize , largemodel , largemodelrotation , '#view1' , '#view2' , {
                transform : 'translateX(0)',
                duration : 2.5
            });
        }
    }, [size])

  return (
    <section className='common-padding'>
        <div className='screen-max-width'>
            <h1 id = "heading" className='section-heading'>Take a close look</h1>

            {/*  Viewing Models */}
            <div className='mt-5 flex flex-col items-center'>
                <div className='w-full h-[75vh] relative md:h-[90vh] overflow-hidden'>
                    <ModelsView  index={1} gsapType = "view1" size = {size} cameraRef = {cameraforsmall} groupRef = {smallmodel} item = {phonemodel} setrotation = {setsmallmodelrotation}/>
                    <ModelsView  index={2} gsapType = "view2" size = {size} cameraRef = {cameraforlarge} groupRef = {largemodel} item = {phonemodel} setrotation = {setlargemodelrotation}/>

                    {/* Canvas inbuilt component */}
                    <Canvas className='w-full h-full' style={{position:'fixed' , left:0 , right:0 , top:0 , bottom:0 , overflow:'hidden'}} eventSource={document.getElementById('root')}>
                        {/* showing views multiple models in same canvas */}
                        <View.Port/>    
                    </Canvas>
                </div>

                <div className="mx-auto w-full">
                    <p className='font-light text-center text-sm mb-5'>{phonemodel.title}</p>
                    <div className='flex-center'>
                        <ul className='color-container'>
                            {models.map((item , index) => (
                                <li key = {index} className='w-6 h-6 rounded-full mx-2 cursor-pointer' style={{backgroundColor: item.color[0]}} onClick={()=> setphonemodel(item)} />
                            ))}
                        </ul>

                        <button className = 'size-btn-container'>
                            {sizes.map(({label , value}) => (
                                <span key = {value} className ="size-btn" style = {{backgroundColor : size=== value ?'white' : 'transparent', color : size === value ? 'black' : 'white'}} onClick={() => setsize(value)}>{label}</span>
                            ))}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Model