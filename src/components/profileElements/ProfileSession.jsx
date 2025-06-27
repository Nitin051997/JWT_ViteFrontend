import { useLayoutEffect, useRef } from 'react';
import '../../css/ProfileSession.css';
import { AppSwitch } from '../../elements/AppSwitch';
import { Button, Skeleton } from '@mui/material';
import gsap from 'gsap';

const ProfileSession = (props) => {

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
    <main className='profile-session'  ref={containerRef}>
        <article className='profile-session-token' ref={(el) => (articlesRef.current[0] = el)}>
            <span className='profile-session-status-title'>User Token:</span>
            <div className='profile-session-token-container'
            title={props?.token ? "Copy" : ""}
            style={{cursor: props?.token ? "pointer" : "default", backgroundColor: "rgb(10, 10, 10)"}}
            onClick={() => props?.ProfileSessionCopyToClipboard({copyData: props?.token})}
            >
                <span className='profile-session-token-text'>{props?.token}</span>
                <span style={{display: "flex", justifyContent: "flex-end"}}>
                    <img style={{width: "20px"}} src={new URL(`../../assets/buttonIcon/Copy.png`, import.meta.url).href} alt='copytoken'/>
                </span>
            </div>
        </article>
        <article className='profile-session-loginstatus' ref={(el) => (articlesRef.current[1] = el)}>
            {props?.status !== "Rejected" 
            ? (<>
                <span className='profile-session-status-title'>LogIn:</span>
                <span title={props?.logedIn ? "Log Out" : ""}>
                    <AppSwitch  sx={{ m: 1 }} defaultChecked={props?.logedIn} onChange={() => {
                        if(props?.logedIn){
                            props?.ProfileCredentialsDataStatus({userName: props?.username , status: "Log Out"});
                        }
                    }} disabled={!props?.logedIn}/>
                </span>
            </>) 
            : (<>
                <span className='profile-session-status-title'>Activate:</span>
                <Button sx={{borderRadius: "50%"}}
                onClick={() => {
                    props?.ProfileCredentialsDataStatus({userName: props?.username , status: null})
                }}
                >
                    <img title='Activate' style={{width: "60px"}} src={new URL(`../../assets/buttonIcon/Active.png`, import.meta.url).href} alt='re-activate'/>
                </Button>
            </>)}
        </article>
    </main>
  )
}

export const ProfileSessionLoader = () => {
    return (
        <>
                <main className='profile-session-loader'>
                    <article className='profile-session-token'>
                        <Skeleton variant="text" width={"100%"} height={"40%"} sx={{ bgcolor: 'grey.900' }} />
                        <Skeleton variant="rounded" width={"100%"} height={"60%"} sx={{ bgcolor: 'grey.900' }} />
                    </article>
                    <article className='profile-session-loginstatus'>
                        <Skeleton variant="rounded" width={"100%"} height={"100%"} sx={{ bgcolor: 'grey.900' }} />
                    </article>
                </main>
        </>
    )
}

export default ProfileSession;