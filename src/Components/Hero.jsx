import React, { useEffect, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {heroVideo, smallHeroVideo} from '../utils'

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

  const handleVideoSrcSet = () => {
    if(window.innerWidth < 760){
      setVideoSrc(smallHeroVideo)
    }
    else{
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);

    return () => {
      window.removeEventListener('reisze', handleVideoSrcSet)
    }
  }, [])

  useGSAP(()=>{
    gsap.to('#hero', {
      duration: 2,
      delay: 2,
      opacity: 1,
      y: -20,
      ease: 'power4.out'
    }),
    gsap.to('#cta', {
      duration: 2,
      delay: 2,
      opacity: 1,
      y: -20,
      ease: 'power4.out'
    })
  },[])


  return (
    <section className='w-full nav-height bg-black relative'>
      <div className='h-5/6 w-full flex-center flex-col'>
        <p id='hero' className='hero-title'>iPhone 15 Pro</p>
        <div className='md:w-10/12 w-9/12'>
          <video autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type='video/mp4'/>
          </video>
        </div>
      </div>
      <div id="cta" className='flex flex-col items-center opacity-0 translate-y-20'>
          <a href="#Highlights" className='btn'>Buy</a>
          <p>From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero