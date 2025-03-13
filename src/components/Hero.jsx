import React from 'react'
import { heroVideo, smallHeroVideo } from '../utils'
import { useState, useEffect } from 'react'
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';

//  npm i gsap @gsap/react

const Hero = () => {
  const [videoSource, setvideoSource] = useState(window.innerWidth > 768 ? heroVideo : smallHeroVideo);
//  if its mobile layout , show the smallherovideo , else show the heroVideo

const handleVideoSrc = ()=>{
  if (window.innerWidth < 768){
    setvideoSource(smallHeroVideo);
  } else{
    setvideoSource(heroVideo);
  }
}

useEffect(()=>{
  window.addEventListener('resize', handleVideoSrc)

  return(()=>{
    (window.removeEventListener('resize', handleVideoSrc))
  }) 

  //  this return function here is necessary for the cleanup purposes.whenever we go to a different route, where the current component is not required we need to remove all the event listeners attached to it, otherwise memory leaks might happen -> the event listeners might persist while the components do not exist.
}, [])

useGSAP(()=>{
     gsap.to("#herotitle", {
      opacity:1, 
      delay:2.5,
      // duration:1
     })

     gsap.to("#buy", {
       delay:2.5,
      //  duration:1,
       opacity:1, 
       y:0
     })
      
  
}, [])

  return (
    <section className='my-10 w-full nav-height'>

      <div className='h-5/6 flex flex-col items-center '>
      <div id="herotitle" className='hero-title'>iPhone 15 Pro</div>
      
      {/* by using type we tell the browser the type of file we are giving to it -> so it becomes easier to render them */}
        <video type="video/mp4" key={videoSource} playsInline={true} autoPlay muted className='w-10/12 pointer-events-none'>
        {/* playsInline makes sure that the video does'nt go to full screen mode in mobile devices, maintaining the layout and design of the webpage */}
        {/* pointer-events-none : the element does'nt respond to any pointer events like click, hover etc */}
          <source src={videoSource}> 
          </source>
        </video>
       
       <div id="buy" className='flex flex-col items-center gap-3 opacity-0 translate-y-10'>
        <a href="#highlights" className='btn'>Buy</a>
        <div className='text-xl'>From $199/month or $999</div>
       </div>
      
      </div>
    </section>
  )
}

export default Hero

//  window.innerwidth : window is a global object -> innerwidth returns the width of the viewport in pixels. 768 px se kam width pe mobile layout is activated.

//  whenever the window is resized -> we can check the innerwidth and innerheight of window using the event listener resize -> window.addEventListener('resize' ()=>{})

