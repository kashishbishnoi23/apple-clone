import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import ModelView from './ModelView'
import { useState, useRef } from 'react'
import { yellowImg } from '../utils'
import * as THREE from 'three';
import { View, Html } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { models, sizes } from '../constants'
import {animateWithGsapTimeline} from '../utils/animation'
import { useEffect } from 'react'
const Model = () => {


    const [size, setSize] = useState('small');

    const [model, setModel] = useState(
        {
            title:'iPhone 15 Pro in Natural Titanium',
            color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
            img: yellowImg
        }
    )

    // camera control for the model view:
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    // npm install three @react-three/drei @react-three/fiber
    const small = useRef(new THREE.Group()); // small will contain multiple three js elements as a single unit
    const large = useRef(new THREE.Group());

    // rotation:
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    const tl = gsap.timeline();

    useEffect(()=>{
        if (size === 'large'){
          animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
            transform:'translateX(-100%)',
            duration:2
          });
        }

        if (size === 'small'){
            animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
                transform:'translateX(0)',
                duration:2
              });
        }
    }, [size])





  useGSAP(()=>{
    gsap.to('#heading', {
        y: 0,
        opacity:1,
        duration:2
    })
  }, [])

  return (
    <section className='common-padding'>
      <div className='max-w-screen'>

        {/* heading */}
        <h1 id="heading" className='section-heading'>
            Take a closer look
        </h1>

        <div className='flex flex-col items-center mt-5'>

        {/* Model: */}
            <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative '>

                {/* small iphone */}
                <ModelView
                index={1} // referring to the first view 
                groupRef={small} 
                gsapType="view1"
                controlRef={cameraControlSmall}  // for the camera control
                setRotationState={setSmallRotation} // for the rotation control
                item={model} // model information
                size={size} // size of the model
                />

                {/* large iphone */}

                <ModelView
                index={2} // referring to the second view
                groupRef={large} 
                gsapType="view2"
                controlRef={cameraControlLarge}  // for the camera control
                setRotationState={setLargeRotation} // for the rotation control
                item={model} // model information
                size={size} // size of the model
                />

                {/* All the 3D components will be rendered inside Canvas -> it is like a stage for all the objects, camera and lights and it is taking up the whole screen */}

                <Canvas
                className="w-full h-full"
                style={{
                    position:'fixed',
                    top:0,
                    bottom:0,
                    left:0,
                    right:0,
                    overflow:'hidden'
                }}
                eventSource={document.getElementById('root')} 
                // all the event listeners are captured by root
                >
                    {/* View.Port is from @react-three/drei -> helps in responsive 3D rendering */}
                    <View.Port/>  
                </Canvas>


            </div>

            {/* Model information, colors and size */}
            <div className='flex flex-col items-center gap-4'>
                <h2 className='text-center '>
                    {model.title}
                </h2>

                <div className='flex-center gap-3 items-center '>
                   <div className='flex items-center px-3 w-[14vw] rounded-full py-3 justify-evenly bg-gray-300'>
                   <div className=' color-container'>
                     {
                        models.map((item, index)=>(
                            <div key={index} className='rounded-full h-5 w-5 cursor-pointer' style={{backgroundColor: `${item.color[0]}`}}
                            onClick={()=> setModel(item)}
                            >
                            </div>
                        )
                             
                        )
                     }
                   </div>
                   </div>

                   <div className='size-btn-container'>
                    {
                        sizes.map(({label, value})=>
                        (
                            <button key={label} className='size-btn'
                            onClick={()=> setSize(value)}
                            style={{
                                backgroundColor: size === value ? 'white' : 'transparent',
                                color: size === value ? 'black' : 'white'
                            }}
                            > 
                                {label}
                            </button>
                        ))
                    }

                   </div>
                </div>

            </div>

        </div>
      </div>
    </section>
  )
}

export default Model