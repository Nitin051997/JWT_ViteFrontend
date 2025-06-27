import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appTabPanelGlobalStateReset } from '../../services/AppTabPanel/appTabPanel';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

const AppTabPanel = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);

    const { appMenuLoading, appMenuData, appMenuError } = useSelector((state) => state?.appMenuReducer);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleNavigation = (path) => {
        navigate(path);
        dispatch(appTabPanelGlobalStateReset());
    }
  
    return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'white', color: 'black', display: 'flex', height: 400, borderRadius: '0 0 10px 10px' }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', width: "20%" }}
        >
          {
            !appMenuLoading && appMenuData?.status && !appMenuError
            ? Object.keys(appMenuData?.data).map((buttonDetails, index) => {
              return (<Tab key={index} sx={{textTransform: "none", color: "#9c27b0", fontSize: "18px", fontWeight: "600"}} label={buttonDetails} {...a11yProps(index)} />)
            }) 
            : null
          }
        </Tabs>
        {
          !appMenuLoading && appMenuData?.status && !appMenuError 
          ? Object.keys(appMenuData?.data).map((tabKeys, tabindex) => {
            return (<TabPanel key={tabindex} value={value} index={tabindex} style={{width: "80%"}}>
              <div key={`app-tab${tabindex}`} style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "20px"}}>
              {
              appMenuData?.data?.[tabKeys]?.map((buttonDetails, index) => {
                return (
                  <Button key={index} sx={{ textTransform: "none", borderRadius: "10px", backgroundColor: "black", color: "white", gap: "10px" }} onClick={() => {handleNavigation(buttonDetails?.path)}}>
                    <img style={{width: "50px"}} src={new URL(`../../assets/servicesIcon/${buttonDetails?.menuIcon}.png`, import.meta.url).href} alt={buttonDetails?.menuIcon} />
                    <span style={{fontSize: "22px"}} className='profile-credentials-status-label'>{buttonDetails?.menuLabel}</span>
                    <div key={`app-tab-btn${index}`} className='profile-summary-history-stack-content-details'>
                      <img style={{width: "20px", transform: "rotate(-90deg)"}} src={new URL(`../../assets/buttonIcon/Navigate.png`, import.meta.url).href} alt='down arrow' />
                    </div>
                  </Button>)
                })
              }
              </div>
            </TabPanel>)
          })
          : null
        }
      </Box>
    );
}

export default AppTabPanel