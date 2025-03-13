import React from 'react'
import { rightImg, watchImg } from '../utils'
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoCarousel from './VideoCarousel';



const Highlights = () => {

  useGSAP(()=>{
    gsap.to("#title", {
      y:0,
      opacity:1,
      duration:1,
      
    })


    gsap.to(".link", {
     
   
     opacity:1,
     y:0,
     stagger:0.25,
     duration:1
    })

  
  }, [])

  return (
    <section id="highlights" className='bg-zinc w-full  py-14 px-20 overflow-hidden'>
      <div  className='flex justify-between flex-wrap w-full mb-10'>
        <h1 id="title" className='section-heading'>Get the highlights.</h1>
        <div className=' flex items-center gap-4 flex-wrap '>
          <div className='link'> 
            <div>Watch the film </div>
            <img src={watchImg} className='h-4' alt="watch"/>
          </div>

          <div className='link '> 
            <div>Watch the event  </div>
            <img src={rightImg} className='h-2' alt="right"/> 
          </div>

      
        </div>
      </div>

      <VideoCarousel/>
   
    </section>
  )
}

export default Highlights