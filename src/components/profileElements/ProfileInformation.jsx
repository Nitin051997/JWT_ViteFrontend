import React, { useLayoutEffect, useRef } from 'react';
import '../../css/ProfileInformation.css';
import { Skeleton } from '@mui/material';
import { gsap } from "gsap";

const ProfileInformation = React.memo((props) => {

  const containerRef = useRef(null);
  const articlesRef = useRef([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const articles = articlesRef.current;

    // Animate the main container with a bouncing effect
    gsap.fromTo(
      container,
      { opacity: 0, scale: 0.8 }, // Start slightly smaller
      {
        opacity: 1,
        scale: 1,
        duration: 0.5, // Slow and smooth
        ease: "power2.out", // Smooth ease-out without bounce
      }
    );

    // Animate each article with staggered effect
    gsap.fromTo(
      articles,
      { opacity: 0, y: 50, rotateX: -20, scale: 0.9 }, // Initial state
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        scale: 1, 
        duration: 1, 
        stagger: 0.3, // Staggered appearance
        ease: "power3.out" 
      }
    );
  }, []);

    return (
      <main className='profile-information' ref={containerRef}>
          <article className='profile-information-container' title={props?.profileInfo?.profileInfoLeftLabel + ": " + props?.profileInfo?.profileInfoLeftValue} ref={(el) => (articlesRef.current[0] = el)}>
              <span className='profile-information-value'>{props?.profileInfo?.profileInfoLeftValue || "NA"}</span>
              <span className='profile-information-label'>{props?.profileInfo?.profileInfoLeftLabel || "NA"}</span>
          </article>
          <article className='profile-information-container' title={props?.profileInfo?.profileInfoRightLabel + ": " + props?.profileInfo?.profileInfoRightValue} ref={(el) => (articlesRef.current[1] = el)}>
              <span className='profile-information-value profile-information-flex-end'>{props?.profileInfo?.profileInfoRightValue || "NA"}</span>
              <span className='profile-information-label profile-information-flex-end'>{props?.profileInfo?.profileInfoRightLabel || "NA"}</span>
          </article>
      </main>
    )
  });

export const ProfileInformationLoader = (props) => {

  const placeholders = Array.from({ length: props?.numberOfTimes });

  return (
    <>
      {placeholders.map((_, index) => (
          <main className='profile-information' key={index}>
            <article className='profile-information-container'>
              <Skeleton variant="text" width={"100%"} height={"50%"} sx={{ bgcolor: 'grey.900' }} />
              <Skeleton variant="text" width={"100%"} height={"50%"} sx={{ bgcolor: 'grey.900' }} />
            </article>
          </main>
      ))}
    </>
  )
}

export default ProfileInformation;