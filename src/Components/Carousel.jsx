import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'

const Carousel = () => {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video, setvideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isplaying: false,
    })

    const { isEnd, startPlay, videoId, isLastVideo, isplaying } = video;

    useEffect(() => {
      const currentProgress = 0;
      let span = videoSpanRef.current;

      if(span[videoId]){
        // animate the progress of the video
        let anim = gsap.to(span[videoId], {
            onComplete: () => {},

            onUpdate: () => {}
        })
      }
    }, [video, startPlay])
    
    useEffect(() => {
      
    }, [startPlay, videoId, ])
    

  return (
    <>
        <div className='flex items-center justify-center'>
            {hightlightsSlides.map((list, i) => (
                <div key={list.id} id='slider' className='sm:p-20 p-10'>
                    <div className='video-carousel_container'>
                        <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                            <video id='video' playsInline={true} preload='auto' muted>
                                <source src={list.video} type="video/mp4" />
                            </video>
                        </div>
                        <div className='absolute top-12 left-[5%] z-10'>
                            {list.textLists.map((text, i) => (
                                <p key={i} className='md:text-2xl sm:text-xl font-medium'>{text}</p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}

export default Carousel