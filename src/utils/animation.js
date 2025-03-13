import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (target, animationProps, scrollProps) =>{
    gsap.to(target, {
      ...animationProps,
      scrollTrigger:{
        trigger: target,
        toggleActions: 'restart reverse restart reverse',
        start:'top 85%',
        ...scrollProps
      }
    })
}

export const animateWithGsapTimeline = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps) => {
    timeline.to(rotationRef.current.rotation, {
      y: rotationState, 
      // agar size small ha to pehle large ko y axis me rotate kraao -> aur original position pe laao
      duration: 1,
      ease: 'power2.inOut'
    })
  
    timeline.to(
      // then move the first target -> small in this case to the left by 100%
      firstTarget,
      {
        ...animationProps,
        ease: 'power2.inOut'
      },
      '<'
    )
  
    timeline.to(
      // then move the second target -> large in this case to the left by 100%
      secondTarget,
      {
        ...animationProps,
        ease: 'power2.inOut'
      },
      '<'
    )
  }