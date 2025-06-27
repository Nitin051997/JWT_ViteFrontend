import { Button } from '@mui/material';
import React from 'react';
import '../../css/StackViewerNavTab.css';

const StackViewerNavTab = React.memo((props) => {
  return (
    <>
      <section className='stack-viewer-navtab-container'>
        <Button title={props?.navtablabel?.nav} sx={{textTransform: "none", fontSize: "18px", fontWeight: "600", backgroundColor: "black", color: "white", borderRadius: "10px", padding: "4px 10px 4px 6px"}} onClick={() => {props?.navtablabel?.ProfileViewerNavType === "Function" ? props?.StackViewerNavigator() : props?.StackViewerNavigator(-1)}}>
          <img src={new URL(`../../assets/buttonIcon/Navigate.png`, import.meta.url).href} alt='Navigate' width={"30px"} style={{transform: "rotate(90deg)"}} />
          <span className='stack-viewer-navtab-button-label'>
            {props?.navtablabel?.nav}
          </span>
        </Button>
        <Button sx={{borderRadius: "100px"}} title={props?.navtablabel?.reload} onClick={() => props?.StackViewerReloader({type: "", value: ""})}>
          <img src={new URL(`../../assets/buttonIcon/Refresh.png`, import.meta.url).href} alt="Refresh" width={"20px"} />
        </Button>
        <span className='stack-viewer-container-label' title={props?.navtablabel?.containerTitle}>{props?.navtablabel?.containerTitle}</span>
      </section>
    </>
  )
})

export default StackViewerNavTab;