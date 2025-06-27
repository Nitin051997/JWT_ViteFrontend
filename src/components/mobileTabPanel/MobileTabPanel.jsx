import { useState } from 'react';
import '../../css/MobileTabPanel.css';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleDialogBox } from '../../utils/handleDialogBox';
import { mobileTabPanelGlobalStateReset } from '../../services/MobileTabPanel/mobileTabPanel';

const MobileTabPanel = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(null);

    const { appMenuLoading, appMenuData, appMenuError } = useSelector((state) => state?.appMenuReducer);

    const handleExpansion = (value) => {
        setExpanded(value !== expanded ? value : null );
    };

    const handleCloseMobileTabPanel = () => {
        dispatch(mobileTabPanelGlobalStateReset());
    };

    const handleNavigation = (path) => {
        navigate(path);
        handleCloseMobileTabPanel()
    }

    const handleLogout = async () => {
        await handleDialogBox(dispatch, true, "logout", "Alert!", "Are you sure want to Logout?, Kindly make sure you don't left with any unsaved work.", "", "" );
    };

  return (
    <section className='mobile-tab-panel-container'>
        <div className='mobile-tab-panel-profile'>
            <span className='app-nav-bar-title' style={{color: "black"}} onClick={() => {}}>Undefined</span>
            <Button style={{position: "absolute", right: "0", borderRadius: "100px"}} onClick={() => handleCloseMobileTabPanel()}>
                <img style={{width: "25px"}} src={new URL(`../../assets/buttonIcon/Close.png`, import.meta.url).href} alt='close'/>
            </Button>
        </div>
        <div className='mobile-tab-panel-menu'>
        {
          !appMenuLoading && appMenuData?.status && !appMenuError 
          ? Object.keys(appMenuData?.data).map((tabKeys, tabindex) => {
            return (<Accordion
                expanded={expanded === tabindex}
                onClick={() => handleExpansion(tabindex)}
                slots={{ transition: Fade }}
                slotProps={{ transition: { timeout: 400 } }}
                sx={[
                    expanded === tabindex
                    ? {
                        [`& .${accordionClasses.region}`]: {
                            height: 'auto',
                        },
                        [`& .${accordionDetailsClasses.root}`]: {
                            display: 'block',
                        },
                    }
                    : {
                        [`& .${accordionClasses.region}`]: {
                            height: 0,
                        },
                        [`& .${accordionDetailsClasses.root}`]: {
                            display: 'none',
                        },
                    },
                ]}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                        <span style={{fontSize: "20px", fontWeight: "400"}}>{tabKeys}</span>
                    </AccordionSummary>
                    <AccordionDetails sx={{display: "flex", flexDirection: "column"}}>
                    {
                        appMenuData?.data?.[tabKeys]?.map((buttonDetails, index) => {
                            return (<>
                                <Button fullWidth key={index} sx={{ display: "flex", textTransform: "none", borderRadius: "10px", backgroundColor: "#f7f7f7", color: "black", marginBottom: appMenuData?.data?.[tabKeys]?.length - 1 !== index ? "10px" : "" }} onClick={() => {handleNavigation(buttonDetails?.path)}}>
                                    <img style={{flex: "10%", width: "30px"}} src={new URL(`../../assets/servicesIcon/${buttonDetails?.menuIcon}.png`, import.meta.url).href} alt={buttonDetails?.menuIcon} />
                                    <span style={{flex: "60%", fontSize: "22px"}} className='profile-credentials-status-label'>{buttonDetails?.menuLabel}</span>
                                    <div className='profile-summary-history-stack-content-details'>
                                        <img style={{width: "20px", transform: "rotate(-90deg)"}} src={new URL(`../../assets/buttonIcon/Navigate.png`, import.meta.url).href} alt='down arrow' />
                                    </div>
                                </Button>
                                {appMenuData?.data?.[tabKeys]?.length - 1 !== index ? <hr/> : <></> }
                            </>)
                        })
                    }
                    </AccordionDetails>
                </Accordion>)
          })
          : null
        }
        </div>
        <div className='mobile-tab-panel-access'>
            <Button endIcon={<Logout fontSize='medium'/>} sx={{width: "100%", textTransform: "none", fontSize: "22px", fontWeight: "600", color: "black"}} onClick={() => {handleLogout()}}>
                Log Out
            </Button>
        </div>
    </section>
  )
}

export default MobileTabPanel;