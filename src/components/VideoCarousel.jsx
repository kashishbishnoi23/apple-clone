import React from 'react'
import {useState, useEffect, useRef} from 'react'
import { hightlightsSlides } from '../constants'
import { playImg, pauseImg, replayImg } from '../utils'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



const VideoCarousel = () => {

  const videoRef = useRef([]); // to take reference of the videos
  const videoSpanRef = useRef([]); // to change the width of span
  const videoDivRef = useRef([]); // to change the width of the div

  const [loadedData, setloadedData] = useState([]); // this is to make sure an animation only works when all the videos are already loaded

  // const [array, setArray] = useState([1,2,3,4]);

  const [video, setVideo] = useState({
    isEnd:false,
    startPlay:false,
    videoId:0,
    isPlaying:false,
    isLastVideo:false
  })
  const {isEnd, startPlay, videoId, isPlaying, isLastVideo} = video;



  useEffect(()=>{
     if (loadedData.length > 3){
        // metadata of all the videos have been loaded

        if (!isPlaying){
          // pause the video:
          //  console.log(loadedData);

          videoRef.current[videoId].pause();
        } else{
          
          startPlay && videoRef.current[videoId].play(); // startPlay true krte hi first time hamari video chalegi
        }

     }


  }, [startPlay, videoId, isPlaying, loadedData])

  //  store the loaded meta data to loadedData
  const handleLoadedMetaData = (i, e)=> setloadedData((pre)=> [...pre, e]);
  


  useGSAP(()=>{
     
    console.log("video id = ", videoId);
    gsap.to('#slider', {
      x : `${-100*(videoId)}%`, // each video has a slider with id slider -> so each slide moves individully to left , as if we would move the entire flexbox -> it would move out of frame on moving left by 100% or more so we move each slider individually -> first 0%, then 100%, then 200% and so on.
      duration:2,
      ease:'power2.inOut'
    })


    gsap.to( "#video", {
      scrollTrigger:{
        trigger: "#video",
        toggleActions:"restart none none none", // video should play when it comes into view for the first time
        /*
        Each word specifies what happens during these events:

restart (onEnter): Restart the animation when the element enters the viewport for the first time.
none (onLeave): Do nothing when the element leaves the viewport.
none (onEnterBack): Do nothing when the element re-enters the viewport from the bottom.
none (onLeaveBack): Do nothing when the element leaves the viewport while scrolling up.

        */
      },
       onComplete:()=>{
          // animation pura hote hi ham startPlay ko true set kr denge -> aur hamaara first video play ho jayega
          // console.log("hey");

          setVideo((pre)=>(
            {
             ... pre, startPlay:true, isPlaying:true
            }
          ))
       }

      
      
    })

  
  }, [isEnd, videoId]) // jase hi video end hoga it should move to the left 

  useEffect(()=>{
    let currentProgress = 0;
    let span = videoSpanRef.current;

    // span of current video playing
    if (span[videoId]){
      //  animate the progress of the video
      let anim = gsap.to(span[videoId], {

        // what happens when the animation gets updated
        onUpdate: ()=>{
            let progress = Math.ceil(anim.progress()*100); // used to find out the progess of the animation -> multiplied by 100 to get the percentage

            if (progress !=currentProgress){
              currentProgress = progress;

              // change the width of the div:
                  // set the width of the progress bar
                  gsap.to(videoDivRef.current[videoId], {
                    width:
                      window.innerWidth < 760
                        ? "10vw" // mobile
                        : window.innerWidth < 1200
                        ? "10vw" // tablet
                        : "4vw", // laptop
                  });

                  gsap.to(span[videoId], {
                    width: `${currentProgress}%`,
                    backgroundColor: "white",
                  });
            }
        },
       
        // what happens when the animation gets completed
        onComplete: ()=>{
           if (isPlaying){
            gsap.to(videoDivRef.current[videoId], {
              width: '12px'
            })

            gsap.to(span[videoId], {
              backgroundColor: '#afafaf'
            })
           
        }
      }

  


      })

      if (videoId == 0) {
        anim.restart();
      }
      const animUpdate = ()=>{
        // change the progress of the animation:

        //  currentTime/totalDuration
        anim.progress(videoRef.current[videoId].currentTime/ hightlightsSlides[videoId].videoDuration);
      }

      if (isPlaying){
        gsap.ticker.add(animUpdate); // gsap.ticker helps to execute this animUpdate function, when the video is playing
      } else{
        gsap.ticker.remove(animUpdate);  
      }

      // if (videoId == 0){
      //   anim.restart();
      // }

    
    }

  }, [videoId,  startPlay])


  // handleProcess function to process when we click the control button: 
  const handleProcess = (type, i)=>{
      switch(type){

        case 'video-end':
          // if the current video has ended -> set isEnd to be true and increment the videoId by 1
          setVideo((prev)=>({

            
            ...prev, isEnd:true, videoId: i + 1
            
      }))
          break;

          //  if it is the last video:
          case 'video-last':
          setVideo((pre) =>({
            ...pre, isLastVideo:true
         }))

         break;
        
        case 'play':
          setVideo((pre)=>({
            ...pre, isPlaying: !pre.isPlaying
          }))
          break;
        case 'pause':
          setVideo((pre)=>(
            {
              ...pre, isPlaying:!pre.isPlaying
            }
          ))
          break;
      
      
          case 'video-reset':
          setVideo((pre)=>({
            ...pre, videoId:0, isLastVideo:false
          }))
          break;

        default:
          return video;
      }
  }

  return (
    <>
    <section>
      <div className='flex overflow-hidden w-fit'>
        {
          hightlightsSlides.map((slide, i)=>
          (
            <div key={slide.id} id="slider">
            <div  id={slide.id} className='bg-black rounded-xl relative video-carousel_container mr-10'>

              <video className='w-full h-full'
              preload='auto' 
              playsInline={true}
              muted
              id="video"

              // setting the reference of the video:
              ref={(el) => (videoRef.current[i] = el)}

              // when the video is playing, set isPlaying to be true
              onPlay={()=> {
                setVideo((prevVideo) =>({
                  ...prevVideo, isPlaying:true
                }))
              }}
              
              // on loaded meta data:
              onLoadedMetadata={(e) =>
                handleLoadedMetaData(i, e)
              }

              // when the video ends:
              onEnded={
                ()=>
                  i !== 3
                  ? handleProcess('video-end', i)
                  : handleProcess('video-last')
              }

              >
                <source src={slide.video} type="video/mp4"/>
              </video>

            
              <div className='absolute top-10 left-[5%] w-full'>
                { slide.textLists.map((text)=> (
                <div key={text} className='sm:text-2xl text-md'>
                  {text}
                </div>
                
               ))}
              </div>
            </div>
            </div>
          ))
        }

      </div>

      <div className='flex-center my-10 relative'>

        <div className='flex-center px-8 py-5 bg-gray-300 rounded-full'>

          { 
          
            videoRef.current.map((_, i)=>{
              return (
              <div
              key={i}
              ref={(ele)=> videoDivRef.current[i] = ele}
              className='mx-2 w-3 h-3  bg-gray-200 rounded-full relative cursor-pointer' 
              >
              <span key={i}
              ref={(ele) => videoSpanRef.current[i] = ele}
              className='h-full w-full absolute rounded-full'
              >
              
              </span>

              </div>
              )
            })
          }
        </div>
      

       <button className='control-btn'
              onClick={
                isLastVideo ? ()=> handleProcess('video-reset')
                : !isPlaying ? ()=> handleProcess('play')
                : ()=> handleProcess('pause')
              }
        >
          <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo? 'replay' : !isPlaying ? 'play' : 'pause'}>

{/*  when we click that button -> it'll call a function named handleProcess which will either reset or play or pause the video according to the requirement */}
        
          </img>
          
    

        


         </button> 


      </div>
    </section>
    </>
  )
}

export default VideoCarousel