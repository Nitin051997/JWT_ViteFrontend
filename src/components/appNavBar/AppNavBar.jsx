import { Avatar, Button, createTheme, IconButton, ListItemIcon, Menu, MenuItem, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import '../../css/AppNavBar.css';
import { useNavigate } from 'react-router-dom';
import { Logout, Person, Settings } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { handleDialogBox } from '../../utils/handleDialogBox';
import { appTabPanelGlobalStateReset, appTabPanelGlobalStateValues } from '../../services/AppTabPanel/appTabPanel';
import { appMenuAction } from '../../services/AppMenu/appMenu';
import { mobileTabPanelGlobalStateReset, mobileTabPanelGlobalStateValues } from '../../services/MobileTabPanel/mobileTabPanel';

const AppNavBar = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userProfile, setUserProfile] = useState(false);
    const open = Boolean(userProfile);

    const { appTabPanelState } = useSelector((state) => state?.appTabPanelGlobalState);
    const { mobileTabPanelState } = useSelector((state) => state?.mobileTabPanelGlobalState);

    let getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#1976d2',
          },
        },
      });

    const handleProfileClose = () => {
        setUserProfile(false)
        dispatch(appTabPanelGlobalStateReset());
    }

    const handleLogout = async () => {
        await handleDialogBox(dispatch, true, "logout", "Alert!", "Are you sure want to Logout?, Kindly make sure you don't left with any unsaved work.", "", "" );
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(event.target.className === "app-nav-bar-functions" || event.target.className === "app-menu-box-container open" || event.target.className === "app-nav-bar select-text-disable" || event.target.className === "app-nav-bar-title" || event.target.className === "app-nav-bar-details"){
                setUserProfile(false);
                dispatch(appTabPanelGlobalStateReset());
            }
            if(event.target.className === "mobile-menu-box-container"){
                dispatch(mobileTabPanelGlobalStateReset());
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
          };
    });

  return (
    <>
        <nav className='app-nav-bar select-text-disable'>
            <div className='app-nav-bar-details'>
                <span className='app-nav-bar-title' onClick={() => {navigate('/home')}}>Undefined</span>
                {/* <span className='app-nav-bar-timer'>{props?.timer}</span> */}
            </div>
            <div className='app-nav-bar-functions'>
                <Button title={"menu"} color="secondary" style={{textTransform: 'none'}} onClick={() => {
                    let appMenu = { dispatch };
                    dispatch(appTabPanelGlobalStateValues({appTabPanelState: !appTabPanelState}))
                    setUserProfile(false);
                    dispatch(appMenuAction({ appMenu }));
                    }}
                    role={"menu"}>
                    <MenuIcon style={{ fontSize: 45 }}/>
                </Button>
                <IconButton title={"userprofile"} role={"userprofile"} sx={{height: "50px"}} size="large" edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit" onClick={() => {
                    setUserProfile(!userProfile);
                    dispatch(appTabPanelGlobalStateReset());
                    }}>
                    <Avatar>{getUserStatus?.username?.[0] || 'U'}</Avatar>
                </IconButton>
            </div>
            <div className='app-nav-bar-mobile'>
                <Button title={"menu"} color="secondary" style={{textTransform: 'none'}} onClick={() => {
                    let appMenu = { dispatch };
                    dispatch(mobileTabPanelGlobalStateValues({mobileTabPanelState: !mobileTabPanelState}));
                    dispatch(appMenuAction({ appMenu }));
                }} role={"menu"}>
                    <MenuIcon style={{ fontSize: 45 }}/>
                </Button>
                <span className='app-nav-bar-title' onClick={() => {navigate('/home')}}>Undefined</span>
            </div>
        </nav>
        <ThemeProvider theme={darkTheme}>
            <Menu 
                open={open} id="account-menu" onClose={() => handleProfileClose()}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                PaperProps={{elevation: 0, sx: {overflow: 'visible', filter: '', mt: '60px', '& .MuiAvatar-root': {width: 32, height: 32,},'&::before': {content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 10001,},},}}>
                <MenuItem>
                    <ListItemIcon>
                        <Person/>
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize='small'/>
                    </ListItemIcon>
                    Setting
                </MenuItem>
                <MenuItem onClick={() => {handleLogout()}}>
                    <ListItemIcon>
                        <Logout fontSize='small'/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </ThemeProvider>
    </>
  )
}

export default AppNavBar;