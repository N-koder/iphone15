import { Html, OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import React, { Suspense } from 'react'
import { AmbientLight } from 'three'
import Lights from './Lights'
import IphoneModel from './applemodel'

import * as THREE from 'three';



const ModelsView = ({index, gsapType, size, cameraRef, groupRef, item, setrotation}) => {
  return (
    <View id = {gsapType} index = {index} className = {`w-full h-full absolute ${index == 2 ? 'right-[-100%]' : ''}  `}>


      {/* playing with Lightning */}
      <ambientLight intensity={0.3}/>


      {/* perspective camera  */}
      <PerspectiveCamera makeDefault position={[0,0,4]}/>


      {/* custom Lights */}
      <Lights/>


      <group ref={groupRef} name = {`${index == 1}?'small' : 'large'`} position={[0,0,0]}>
        {/* Loader until the model view*/}  
        <Suspense fallback={<Html><div>Loading...</div></Html>}>
          <IphoneModel scale = {index === 1 ? [15,15,15] : [17,17,17]} item = {item} size ={size}/>
        </Suspense>
      </group>


      <OrbitControls makeDefault enablePan={false} enableZoom={false} rotateSpeed={0.5} ref={cameraRef} target = {new THREE.Vector3(0,0,0)} onEnd={()=> setrotation(cameraRef.current.getAzimuthalAngle())}/>
    </View>
  )
}

export default ModelsView