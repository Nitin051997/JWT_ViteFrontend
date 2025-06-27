import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppNavBar from '../components/appNavBar/AppNavBar';
import LoginPage from '../pages/loginpage/LoginPage';
import SignupPage from '../pages/signuppage/SignupPage';
import Developer from '../test/Developer';
import HomePage from '../pages/homepage/HomePage';
import ListOfUser from '../container/ListOfUser/ListOfUser';
import UserProfile from '../container/UserProfile/UserProfile';
import MessageBox from '../components/alert/MessageBox';
import DialogBox from '../components/alert/DialogBox';
import AppTabPanel from '../components/appTabPanel/AppTabPanel';
import MobileTabPanel from '../components/mobileTabPanel/MobileTabPanel';
import CreateUserLayout from '../layouts/CreateUserLayout';
import InvoicePage from '../pages/InvoicePage';


const AppRouter = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPanel, setShowPanel] = useState(false);

  const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"))

  const { statusMessageBox, duration, typeMessageBox, message, position, side } = useSelector((state) => state?.showMessageBoxGlobalState);
  const { statusDialogBox, typeDialogBox, title, information, clearButton, actionButton } = useSelector((state) => state?.showDialogBoxGlobalState);
  const { appTabPanelState } = useSelector((state) => state?.appTabPanelGlobalState);
  const { mobileTabPanelState } = useSelector((state) => state?.mobileTabPanelGlobalState);
  const { userLoginData } = useSelector((state) => state?.userLoginReducer);

  useEffect(() => {
    if(statusDialogBox){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    if (appTabPanelState) {
      setTimeout(() => setShowPanel(true), 100);
    } else {
      setShowPanel(false)
    }

    // if(timer === "" && getUserStatus?.status){
    //   appTimer(setTimer, 30, "timeout", dispatch, navigate);
    // }

  }, [statusDialogBox, getUserStatus, dispatch, navigate, appTabPanelState]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
        if(getUserStatus?.status && getUserStatus?.username){
          // handleAppLogout( dispatch, getUserStatus?.username, navigate, "LogOut" );
        }
    };
    window.addEventListener('pagehide', handleBeforeUnload);
    return () => {
      window.removeEventListener('pagehide', handleBeforeUnload);
    };
  });

  return (
  <>
    {getUserStatus?.status || userLoginData?.status ? <AppNavBar timer={props?.timer}/> : <></>}
    <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/developer' element={<><Developer /></>}/>
        <Route path='/invoice' element={<><InvoicePage /></>}/>
        {getUserStatus?.status || userLoginData?.status 
        ? 
        <>
          <Route path='/home' element={<><HomePage /></>}/>
          <Route path='/userlist' element={<><ListOfUser /></>}/>
          <Route path='/userprofile' element={<><UserProfile /></>}/>
          <Route path='/createuser' element={<><CreateUserLayout /></>}/>
        </> 
        : 
        <>
          <Route path='*' element={<>Kindy make sure you login to get access.</>}/>
        </>
        }
        <Route path='*' element={<>404 Page Not Found.</>}/>
    </Routes>
    {statusMessageBox ? <MessageBox status={statusMessageBox} duration={duration} type={typeMessageBox} message={message} position={position} side={side}/> : <></> }
    {statusDialogBox ? <div className='dialog-box-container'>
      <DialogBox status={statusDialogBox} type={typeDialogBox} title={title} information={information} clearButton={clearButton} actionButton={actionButton} timer={1}/>
    </div> : <></>}
    {appTabPanelState ? <div className={`app-menu-box-container ${showPanel ? 'open' : ''}`}>
      <section>
        <AppTabPanel />
      </section>
    </div> : <></>}
    {mobileTabPanelState ? <div className='mobile-menu-box-container'>
      <MobileTabPanel />
    </div> : <></>}
  </>
  )
}

export default AppRouter;