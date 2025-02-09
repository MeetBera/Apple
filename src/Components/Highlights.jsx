import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import React from 'react'
import {watchImg, rightImg} from '../utils'
import Carousel from './Carousel';

const Highlights = () => {
  useGSAP(()=>{
    gsap.to('#title', {duration: 2, delay: 1, opacity: 1, y: 0, ease: 'power4.out'})
    gsap.to('.link', {duration: 2, delay: 1, opacity: 1, y: 0, ease: 'power4.out', stagger: 0.25})
  }, [])
  return (
    <section id='Highlights' className='text-white w-screen overflow-hidden h-full common-padding bg-zinc'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full items-end justify-between md:flex'>
          <h1 id='title' className='section-heading'>Get the highlights</h1>
          <div className='flex flex-wrap gap-5 items-end '>
            <p className='link'>
              Watch the Film
              <img src={watchImg} alt="watch" className='ml-2'/>
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>
        <Carousel />
      </div>
    </section>
  )
}

export default Highlights