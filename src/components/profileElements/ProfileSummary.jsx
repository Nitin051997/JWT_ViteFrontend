import { useLayoutEffect, useRef } from 'react';
import '../../css/ProfileSummary.css';
import { Button, Skeleton } from '@mui/material';
import ProfileGraph from './ProfileGraph';
import { formatDateTime } from '../../utils/formatDateTime';
import gsap from 'gsap';

const ProfileSummary = (props) => {

    const containerRef = useRef(null);
    const articlesRef = useRef([]);

  const stackViewerList = useRef([]);

  useLayoutEffect(() => {
    if (!stackViewerList?.current?.length) return; // ✅ Ensure refs exist before animating
    gsap.fromTo(
      stackViewerList?.current?.filter((el) => el), // ✅ Filter out null refs
      { opacity: 0, y: 50 }, // Start position
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1, // Delay between items
        ease: "power2.out",
      }
    );
  }, [props?.timeLineContactDetails, props?.timeLineHistoryDetails, props?.timeLineState?.timeLine]);
  
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
    <main ref={containerRef} className='profile-summary' style={{gap: props?.timeLineState?.timeLine === "Connect" || props?.timeLineState?.timeLine === "History" ? "" : "20px" }}>
        <article className='profile-summary-log' ref={(el) => (articlesRef.current[0] = el)}>
            <section className='profile-summary-timeline'>
                <div className='profile-summary-timeline-contact' onClick={() => {props?.timeLineFunction("Summary TimeLine Action","Connect")}}>
                    <Button sx={{width: "100%", textTransform: "none", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div className='profile-summary-timeline-btn'>
                            <span className='profile-summary-timeline-btn-text'>Contact Details</span>
                            <span className='profile-summary-timeline-btn-label'>Connect</span>
                        </div>
                        <div className='profile-summary-timeline-btn-icon'>
                            <img className='profile-summary-timeline-btn-icon-img' style={{transform: props?.timeLineState?.timeLine === "Connect" ? "rotate(180deg)" : ""}} src={new URL(`../../assets/buttonIcon/Navigate.png`, import.meta.url).href} alt='Navigate' />
                        </div>
                    </Button>
                </div>
                <div className='profile-summary-timeline-history' onClick={() => {props?.timeLineFunction("Summary TimeLine Action","History")}}>
                    <Button sx={{width: "100%", textTransform: "none", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div className='profile-summary-timeline-btn'>
                            <span className='profile-summary-timeline-btn-text'>Session Log</span>
                            <span className='profile-summary-timeline-btn-label'>History</span>
                        </div>
                        <div className='profile-summary-timeline-btn-icon'>
                            <img className='profile-summary-timeline-btn-icon-img' style={{transform: props?.timeLineState?.timeLine === "History" ? "rotate(180deg)" : ""}} src={new URL(`../../assets/buttonIcon/Navigate.png`, import.meta.url).href} alt='Navigate' />
                        </div>
                    </Button>
                </div>
            </section>
            <section className='profile-summary-edit'>
                <Button sx={{width: "100%", height: "100%", textTransform: "none", color: "white", fontSize: "22px", fontWeight: "600"}}>
                    <img className='profile-summary-edit-icon' src={new URL(`../../assets/editIcon/EditUser.png`, import.meta.url).href} alt='EditUser' />&nbsp;Edit User
                </Button>
            </section>
        </article>
        {
        props?.timeLineState?.timeLine === "Connect" 
        ? <>
        {
            props?.timeLineContactDetails?.length > 0 
            ? (<div className='profile-summary-connect-container'>
                <div className='profile-summary-connect-wire'>
                    <div className='profile-summary-connect-wire-partOne'></div>
                    <div className='profile-summary-connect-wire-partTwo'></div>
                </div>
                {props?.timeLineContactDetails?.map((data, index) => {
                    return (<div 
                        key={"list-" + index} 
                        ref={(el) => { if (el) stackViewerList.current[index] = el}}
                        className='profile-summary-connect-stack' 
                        style={{
                        borderLeft: index !== props?.timeLineContactDetails?.length - 1 ? "3px solid black" : "",
                        position: index === props?.timeLineContactDetails?.length - 1 ? "relative" : "",
                        opacity: 0
                        }}>
                                {index === props?.timeLineContactDetails?.length - 1 ? <div className='profile-summary-connect-last-stack'></div> : <></>}
                                <div className='profile-summary-connect-stack-line' style={{margin: index === props?.timeLineContactDetails?.length - 1 ? "0 0 0 3px" : ""}}>
                                    <img className='profile-summary-connect-stack-icon' src={new URL(`../../assets/buttonIcon/ListPoint.png`, import.meta.url).href} alt='ListPoint' />
                                    <div className='profile-summary-connect-stack-link'></div>
                                </div>
                                <div className='profile-summary-connect-stack-content'>
                                    <div className='profile-summary-connect-stack-content-icon'>
                                        <img className='profile-summary-connect-stack-content-icon-img' src={new URL(`../../assets/InformationIcon/${data?.icon}.png`, import.meta.url).href} alt={data?.icon}/>
                                    </div>
                                    <div className='profile-summary-connect-stack-content-label'>
                                        <span className='profile-summary-connect-stack-text'>{data?.label}</span>
                                    </div>
                                    <div className='profile-summary-connect-stack-content-value'>
                                        <span className='profile-summary-connect-stack-text'>{data?.value}</span>
                                    </div>
                                </div>
                            </div>)
                })}
            </div>) 
            : 
            <div style={{ width: "100%", height: "40%", textAlign: 'center', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 'bold' }}>Connect Details is Empty!</h1>
            </div>
        }
        </> 
        : props?.timeLineState?.timeLine === "History" 
        ? <>
        {
            props?.timeLineHistoryDetails.length > 0 
            ? (<div className='profile-summary-history-container'>
                <div className='profile-summary-history-wire'>
                    <div className='profile-summary-history-wire-partOne'></div>
                    <div className='profile-summary-history-wire-partTwo'></div>
                </div>
                {props?.timeLineHistoryDetails?.map((data, index) => {
                    return (<div 
                    key={"list-" + index} 
                    ref={(el) => { if (el) stackViewerList.current[index] = el}}
                    className='profile-summary-history-stack' 
                    style={{
                        borderLeft: index !== props?.timeLineHistoryDetails?.length - 1 ? "3px solid black" : "", 
                        position: index === props?.timeLineHistoryDetails?.length - 1 ? "relative" : "",
                        opacity: 0
                        }}
                    >
                        {index === props?.timeLineHistoryDetails?.length - 1 ? <div className='profile-summary-history-last-stack'></div> : <></>}
                        <div className='profile-summary-history-stack-line' style={{margin: index === props?.timeLineHistoryDetails?.length - 1 ? "0 0 0 3px" : ""}}>
                            <img className='profile-summary-history-stack-icon' src={new URL(`../../assets/buttonIcon/ListPoint.png`, import.meta.url).href} alt='ListPoint'/>
                            <div className='profile-summary-history-stack-link'></div>
                        </div>
                        <div className='profile-summary-history-stack-content'>
                            <main style={{width: "100%", display: "flex"}}>
                                <div className='profile-summary-history-stack-content-list'>
                                    <div className='profile-summary-history-stack-content-action'>
                                        <span className='profile-summary-history-stack-text'>{data?.action}</span>
                                        <span className='profile-summary-history-stack-label'>Action</span>
                                    </div>
                                </div>
                                <div className='profile-summary-history-stack-content-list'>
                                    <div className='profile-summary-history-stack-content-list'>
                                        <img style={{width: "50px"}} src={new URL(data?.browserName ? `../../assets/browserIcon/${data?.browserName}.png` : `../../assets/browserIcon/Browser.png`, import.meta.url).href} alt='Browser' />
                                    </div>
                                    <div className='profile-summary-history-stack-content-browser'>
                                        <span className='profile-summary-history-stack-text'>{data?.browserName}</span>
                                        <span className='profile-summary-history-stack-label'>Browser</span>
                                    </div>
                                </div>
                                <div className='profile-summary-history-stack-content-list'>
                                    <div className='profile-summary-history-stack-content-list'>
                                        <img style={{width: "50px"}} src={new URL(`../../assets/InformationIcon/Calendar.png`, import.meta.url).href} alt='Calendar' />
                                        </div>
                                    <div className='profile-summary-history-stack-content-date'>
                                        <span className='profile-summary-history-stack-text'>{formatDateTime({ value: data?.timeStamp })}</span>
                                        <span className='profile-summary-history-stack-label'>Date</span>
                                    </div>
                                </div>
                                <div className='profile-summary-history-stack-content-list-btn'>
                                    <div className='profile-summary-history-stack-content-details' onClick={() => props?.timeLineHistoreFunction("Summary Details Action",index)}>
                                        <img style={{width: "20px", transform: index === props?.timeLineState?.sessionDetails ? "rotate(180deg)" : "rotate(0deg)"}} src={new URL(`../../assets/buttonIcon/Navigate.png`, import.meta.url).href} alt='Navigate' />
                                    </div>
                                </div>
                            </main>
                            { index === props?.timeLineState?.sessionDetails ?
                            <main className='profile-summary-history-stack-information'>
                                {[{...data}]?.map((_, index, details) => {
                                    let listKeys = Object.keys(details[index]); 
                                    return listKeys?.map((data, listindex) => {
                                        return <span key={"list" + listindex} className='profile-summary-history-stack-information-text'> -- "{data}": "{details[index][data]}"</span>
                                    })
                                })}
                            </main> : <></>}
                        </div>
                    </div>)
                })} 
            </div>) 
            : 
            <div style={{ width: "100%", height: "40%", textAlign: 'center', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 'bold' }}>Log is Empty!</h1>
            </div>
        }
        </> 
        : 
        <article ref={(el) => (articlesRef.current[1] = el)}>
            <ProfileGraph />
        </article>
        }
    </main>
  )
}

export const ProfileSummaryLoader = () => {
    return (
        <>
                <main className='profile-summary-loader'>
                    <section style={{display: "flex", gap: "20px", padding: "0 20px 0 20px"}}>
                        <Skeleton variant="text" width={"100%"} height={"70px"} sx={{ bgcolor: 'grey.900' }} />
                        <Skeleton variant="text" width={"100%"} height={"70px"} sx={{ bgcolor: 'grey.900' }} />
                    </section>
                    <section style={{display: "flex", padding: "0 20px 20px 20px"}}>
                        <Skeleton variant="rounded" width={"100%"} height={"100px"} sx={{ bgcolor: 'grey.900' }} />
                    </section>
                </main>
        </>
    )
}

export default ProfileSummary;