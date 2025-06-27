import React from 'react';
import { Avatar, Button, Skeleton } from '@mui/material';
import '../../css/StackViewerCard.css';

const StackViewerCard = React.memo((props) => {
    return (
      <>
          <div className='stack-viewer-card' key={props?.stackKey}>
              {Object.keys(props?.stackData)?.map((section, index) => {
                return (
                    <section key={index} className={`stack-viewer-card-${section}`}>
                    {
                        section === "icon" 
                        ? 
                        <Avatar style={{backgroundColor: `#${props?.stackData?.[section]?.iconColor}`, color: "inherit", margin: "4px"}}>{props?.stackData?.[section]?.iconLabel[0]}</Avatar> 
                        : 
                        section === "information" || section === "zone" 
                        ? 
                        <>
                            {
                                props?.stackData?.[section]?.map(({ [`${section}Label`]: label, [`${section}Value`]: value }, index) => (
                                    <span key={index} className='stack-viewer-card-label'>
                                        {label}
                                        <span className='stack-viewer-card-data'>
                                            {value}
                                        </span>
                                    </span>
                            ))}
                        </>
                        : 
                        section === "status" 
                        ? 
                        <>
                            <span className='stack-viewer-card-data'>
                                {props?.stackData?.[section]?.statusLabel}
                            </span>
                            <span title={`${props?.stackData?.[section]?.statusValue ? "Active" : "Inactive"}`} className='stack-viewer-card-status-info' style={{backgroundColor: props?.stackData?.[section]?.statusValue ? "greenyellow" : "orangered"}}></span>
                        </> 
                        : 
                        section === "action" 
                        ? 
                        <>
                            <Button className='view-user-btn' sx={{height: "36px", textTransform: "none", backgroundColor: "#dfe3ee", color: "#2c4c9c", borderRadius: "10px", padding: "4px", margin: "10px"}} onClick={() => props?.stackData?.[section]?.actionButton()}>{props?.stackData?.[section]?.actionLabel}</Button>
                        </>
                        : 
                        <></>
                    }
                    </section>
                )
              })}
          </div>
      </>
    )
  });


export const StackViewerCardLoader = (props) => {

    const placeholders = Array.from({ length: props?.numberOfTimes });

  return (
    <>
        {placeholders.map((_, index) => (
            <div className='stack-viewer-card-loader' key={index}>
                <div style={{flex: "5%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Skeleton variant="circular" width={40} height={40} />
                </div>
                <div style={{flex: "70%", width: "100%", display: "flex", flexDirection: "column", gap: "4px", margin: "0 10px 0 10px"}}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </div>
                <div style={{flex: "25%"}}>
                    <Skeleton variant="rounded" width={"100%"} height={60} />
                </div>
            </div>
        ))}
    </>
  )
};

export default StackViewerCard;