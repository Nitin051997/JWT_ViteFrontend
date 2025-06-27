import React, { useLayoutEffect, useRef } from 'react';
import '../../css/ProfileServices.css';
import { Button, Skeleton } from '@mui/material';
import gsap from 'gsap';

const ProfileServices = (props) => {

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
    <main className='profile-services' ref={containerRef}>
        <article className='profile-services-title-section' ref={(el) => (articlesRef.current[0] = el)}>
            <span className='profile-services-title'>Services:</span>
            <Button style={{position: "absolute", right: "0", borderRadius: "20px 10px 20px 20px"}}>
                <img className='profile-services-edit-icon' src={new URL(`../../assets/editIcon/Pencil.png`, import.meta.url).href} alt='Pencil'/>
            </Button>
        </article>
        <article className='profile-services-list' ref={(el) => (articlesRef.current[1] = el)}>
            {props?.listData?.length > 0 ?
                props?.listData.map((data, index) => {
                    return (
                        <div key={"list-" + index} className='profile-services-list-data' style={{ borderBottom: `${props?.listData?.length - 1 === index ? "0" : "2"}px solid grey`, position: `${props?.infoState === index ? "relative" : ""}` }}>
                            <img className='profile-services-list-data-icon' src={new URL(`../../assets/servicesIcon/${data?.serviceIcone}.png`, import.meta.url).href} alt={data?.serviceIcone} />
                            <span className='profile-services-list-data-text'>{data?.serviceName || "NA"}</span>
                            <img className='profile-services-list-data-info' title='Click' src={new URL(`../../assets/buttonIcon/Information.png`, import.meta.url).href} alt='Information' onClick={() => props?.infoFunction("Services Info Action", index)} />
                            {
                                props?.infoState === index
                                ? 
                                    <div className='profile-services-list-data-info-container'>
                                    {data?.serviceName + ":" || "NA"} <br/> {data?.serviceDetails || "NA"}
                                    </div>
                                : <></>
                            }
                        </div>
                )
                })
                : 
                <div className='profile-services-no-services'>
                    <img className='profile-services-no-services-img' src={new URL(`../../assets/servicesIcon/NoService.png`, import.meta.url).href} alt='NoService' />
                    <span className='profile-services-list-data-text'>No Service Assigned.</span>                    
                </div>
            }
        </article>
    </main>
  )
}

export const ProfileServicesLoader = () => {
    return (
        <>
                <main className='profile-services-loader'>
                        <Skeleton variant="text" width={"100%"} height={"30px"} sx={{ bgcolor: 'grey.900' }} />
                        <Skeleton variant="text" width={"100%"} height={"30px"} sx={{ bgcolor: 'grey.900' }} />
                        <Skeleton variant="text" width={"100%"} height={"30px"} sx={{ bgcolor: 'grey.900' }} />
                </main>
        </>
    )
}

export default ProfileServices;