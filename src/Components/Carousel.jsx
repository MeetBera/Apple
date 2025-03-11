import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";


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

    const [loadedData, setloadedData] = useState([])

    const { isEnd, startPlay, videoId, isLastVideo, isplaying } = video;

    useGSAP(()=> {
      gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });
      gsap.to("#video", {
        scrollTrigger: {
          trigger: "#video",
          toggleActions: "restart none none none",
        },
        onComplete: () => {
          setvideo((pre) => ({
            ...pre,
            startPlay: true,
            isplaying: true,
          }));
        },
      });
    }, [isEnd, videoId]);
    
  // -----------------------------this use effect is for the progress bar of the video---------------------------------
    useEffect(() => {
      let currentProgress = 0;
      let span = videoSpanRef.current;

      if(span[videoId]){
        // animate the progress of the video
        let anim = gsap.to(span[videoId], {
            onComplete: () => {
              if (isplaying) {
                gsap.to(videoDivRef.current[videoId], {
                  width: '12px'
                })
                gsap.to(span[videoId], {
                  backgroundColor: "#afafaf"
                })
              }
            },

            onUpdate: () => {
              const progress = Math.ceil(anim.progress() * 100);
              if (progress != currentProgress) {
                currentProgress = progress;

                gsap.to(videoDivRef.current[videoId], {
                  width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw',
                })
                gsap.to(span[videoId], {
                  width: `${progress}%`,
                  backgroundColor: "white"
                })
              }
            }
        })
        if (videoId == 0) {
          anim.restart();
        }

        const animUpdate = () => {
          anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
        };

        if (isplaying) {
          gsap.ticker.add(animUpdate);
        }
        else{
          gsap.ticker.remove(animUpdate);
        }

      }
    }, [video, startPlay])



// ------------------------------this use Effect is for playing part of the videos----------------------------------------
    useEffect(() => {
      if (loadedData.length > 3) {
        if (!isplaying) {
          videoRef.current[videoId].pause();
        } else {
          startPlay && videoRef.current[videoId].play();
        }
      }
    }, [startPlay, videoId, isplaying, loadedData]);
    

    const handleLoadedMetaData = (e , i) => setloadedData((pre) => [...pre, e]);
    
    const handleProcess = (type, i) => {
        switch (type) {
          case "video-end":
            setvideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
            break;
    
          case "video-last":
            setvideo((pre) => ({ ...pre, isLastVideo: true }));
            break;
    
          case "video-reset":
            setvideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
            break;
    
          case "pause":
            setvideo((pre) => ({ ...pre, isplaying: !pre.isplaying }));
            break;
    
          case "play":
            setvideo((pre) => ({ ...pre, isplaying: !pre.isplaying }));
            break;
    
          default:
            return video;
        }
      };

  return (
    <>
        <div className='flex items-center'>
            {hightlightsSlides.map((list, i) => (
                <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                    <div className='video-carousel_container'>
                        <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                            <video id='video' playsInline={true} preload='auto' muted 
                                ref={(el) => (videoRef.current[i] = el)} 
                                onEnded={() => i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last')}
                                onPlay={() =>
                                  setvideo((pre) => ({ ...pre, isplaying: true }))
                                }
                                onLoadedMetadata={(e) => handleLoadedMetaData(e , i)}
                            >
                                <source src={list.video} type="video/mp4" />
                            </video>
                        </div>
                        <div className='absolute top-12 left-[5%] z-10'>
                            {list.textLists.map((text, i) => (
                                <p key={i} className='md:text-2xl text-xl font-medium'>{text}</p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='relative flex-center mt-10' >
            <div className='flex-center py-5 px-7 bg-gray-300 rounded-full backdrop-blur'>
                {videoRef.current.map((_, i) => (
                    <span key={i} ref={(el) => (videoDivRef.current[i] = el)} className='mx-2 w-3 h-3 bg-gray-100 cursor-pointer relative rounded-full'>
                        <span className='absolute h-full w-full rounded-full' ref={(el) => (videoSpanRef.current[i] = el)} />
                    </span>
                ))}
            </div>
            <div className='control-btn '>
                <img src={isLastVideo ? replayImg : !isplaying ? playImg : pauseImg} alt="" 
                    onClick={isLastVideo ? () => handleProcess('video-reset')
                    : !isplaying ? () => handleProcess('play')
                    : () => handleProcess('pause')} 
                    className="cursor-pointer"
                    />
            </div>
        </div>
    </>
  )
}

export default Carousel