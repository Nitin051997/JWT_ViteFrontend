import { useLayoutEffect, useRef } from 'react';
import '../../css/ProfileCredentials.css';
import { Button, Skeleton } from '@mui/material';
import gsap from 'gsap';

const ProfileCredentials = (props) => {

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
    <main className='profile-credentials' ref={containerRef}>
        <article className='profile-credentials-details' ref={(el) => (articlesRef.current[0] = el)}>
            <div className='profile-credentials-container' title={props?.username ? `User Name: ${props?.username}` : ""}>
                <span className='profile-credentials-value'>{props?.username || "NA"}</span>
                <span className='profile-credentials-label'>User Name</span>
            </div>
            <div className='profile-credentials-password-container'>
                <div className='profile-credentials-password' title={props?.password ? `Password: ${props?.ProfileCredentialsButton?.showPassword ? props?.password || "NA" : "#$#$#$#$#$"}` : ""}>
                    <span className='profile-credentials-value'>{props?.ProfileCredentialsButton?.showPassword ? props?.password || "NA" : "#$#$#$#$#$"}</span>
                    <span className='profile-credentials-label'>Password</span>
                </div>
                <div className='profile-credentials-password-icon'>
                    <Button title={props?.ProfileCredentialsButton?.showPassword ? "Hide Password" : "Show Password"} sx={{borderRadius: "50%"}} onClick={() => props?.ProfileCredentialsButtonFunction("Password Action")}>
                        <img style={{width: "40px", height: "40px"}} src={new URL(`../../assets/buttonIcon/${props?.ProfileCredentialsButton?.showPassword ? "EyeOpen" : "EyeBlind"}.png`, import.meta.url).href} alt='password' />
                    </Button>
                </div>
            </div>
            <div className='profile-credentials-container' title={props?.orgnization ? `Organization: ${props?.orgnization}` : ""}>
                <span className='profile-credentials-value'>{props?.orgnization || "NA"}</span>
                <span className='profile-credentials-label'>Organization</span>
            </div>
        </article>
        <article className='profile-credentials-status' ref={(el) => (articlesRef.current[1] = el)}>
            <span className='profile-credentials-status-title'>Access:</span>
            { 
                props?.status === "Pending" || props?.status === "Denied" 
                ? (<>
                    <Button sx={{ width: "100%", textTransform: "none", borderRadius: "10px", backgroundColor: "greenyellow", color: "black" }}
                    onClick={() => {
                          props?.ProfileCredentialsDataStatus({userName: props?.username, status: "Approve"})
                      }}
                    >
                        <span className='profile-credentials-status-label'>Approve</span>
                    </Button>
                    <Button sx={{ width: "100%", textTransform: "none", borderRadius: "10px", backgroundColor: 'red', color: "white" }}
                    onClick={() => {
                          props?.ProfileCredentialsDataStatus({userName: props?.username, status: "Reject"})
                      }}
                    >
                        <span  className='profile-credentials-status-label'>Reject</span>
                    </Button>
                </>) 
                : props?.status === "Approved" || props?.status === "Rejected" 
                ? (<>
                    <Button sx={{ width: "100%", textTransform: "none", borderRadius: "10px", backgroundColor: props?.status === "Approved" ? "orangered" : "#FF0009", color: "white" }}
                    onClick={() => {
                      if(props?.status === "Approved"){
                        props?.ProfileCredentialsDataStatus({userName: props?.username, status: "Deny Access"})
                      } else if(props?.status === "Rejected"){
                        props?.ProfileCredentialsDataStatus({status: "Account Rejected"})
                      }
                    }}
                    >
                        <img style={{width: "50px"}} src={new URL(`../../assets/buttonIcon/${props?.status === "Approved" ? "Deny" : "Rejected"}.png`, import.meta.url).href} alt={props?.status === "Approved" ? 'Deny' : 'Rejected'} />
                        <span className='profile-credentials-status-label'>{props?.status === "Approved" ? "Deny Access" : "Access Rejected"}</span>
                    </Button>
                </>) 
                : (<></>)
            }
        </article>
    </main>
  )
}

export const ProfileCredentialsLoader = () => {
    return (
        <>
            <main className='profile-credentials-loader'>
            <article className='profile-credentials-details'>
                <Skeleton variant="text" width={"100%"} height={"30%"} sx={{ bgcolor: 'grey.900' }} />
                <Skeleton variant="text" width={"100%"} height={"30%"} sx={{ bgcolor: 'grey.900' }} />
                <Skeleton variant="text" width={"100%"} height={"30%"} sx={{ bgcolor: 'grey.900' }} />
            </article>
            <article className='profile-credentials-status'>
                <Skeleton variant="text" width={"100%"} height={"40%"} sx={{ bgcolor: 'grey.900' }} />
                <Skeleton variant="rounded" width={"100%"} height={"60%"} sx={{ bgcolor: 'grey.900' }} />
            </article>
            </main>
        </>
    )
}

export default ProfileCredentials;