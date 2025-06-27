import React, { useCallback, useEffect, useState } from 'react';
import '../../css/LoginPage.css';
import { InputField } from '../../elements/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginReset } from '../../services/UserAccess/userLogin';
import { useNavigate } from 'react-router-dom';
import { userVerificationAction } from '../../services/UserAccess/userVerification';
import { handleAppLogin } from '../../utils/handleAppLogin';

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
      username: "", password: "", showPassword: false
  });
  const { userLoginLoading, userLoginData, userLoginError } = useSelector((state) => state?.userLoginReducer);
  const { userVerificationLoading, userVerificationData, userVerificationError } = useSelector((state) => state?.userVerificationReducer);

  const handleUserDetails = useCallback((event) => {
    if(event.target.name === "username"){
      setUserDetails((prevData) => {
        return {...prevData, username: event.target.value}
      });
    } else if(event.target.name === "password"){
      setUserDetails((prevData) => {
        return {...prevData, password: event.target.value}
      });
    } else if(event.target.name === "toggle-icon"){
      setUserDetails((prevData) => {
        return {...prevData, showPassword: !userDetails?.showPassword}
      });
    }
    if(userLoginError?.status === false){
      dispatch(userLoginReset());
    }
},[userDetails, dispatch, userLoginError]);

useEffect(() => {
  let getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));
  if(userVerificationLoading === null && userVerificationData === null && getUserStatus?.status) {
      let UserVerifyDetails = {dispatch: dispatch, navigate: navigate};
      dispatch(userVerificationAction({UserVerifyDetails}));
  } else if(!userVerificationLoading && userVerificationData?.status && userVerificationError === null) {
      navigate('/home');
  }
}, [navigate, dispatch, userVerificationLoading, userVerificationData, userVerificationError]);

useEffect(() => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAppLogin(userDetails?.username, userDetails?.password, dispatch, navigate, "LogIn");
    }
  };
  window.addEventListener("keydown", handleKeyPress);
  return () => {
    window.removeEventListener("keydown", handleKeyPress);
    if(!userLoginLoading && userLoginData?.status){
      dispatch(userLoginReset());
    }
  }
});

  return (
    <div className='login-page-container select-text-disable'>
        <section className='login-page-header'>
            <img className='login-page-app-icon' src={new URL(`../../assets/appGraphic/AppLogo.png`, import.meta.url).href} alt='AppLogo'/>
            <span className='login-page-app-info'>SHARE DoX</span>
        </section>
        <section className='login-page-input'>
          <InputField name={"username"} label={"User Name"} inputsize={"medium"} inputcolor={userLoginError?.status === false ? "#d32f2f" : "#4D6DCC"} inputradius={"20px"} type={"text"} textcolor={"#DADADA"} textsize={"20px"} value={userDetails?.username} handleOnChange={handleUserDetails} validation={userLoginError?.status === false ? true : false}/>
          <InputField name={"password"} label={"Password"} inputsize={"medium"} inputcolor={userLoginError?.status === false ? "#d32f2f" : "#4D6DCC"} inputradius={"20px"} type={userDetails?.showPassword ? "text" : "password"} textcolor={"#DADADA"} textsize={"20px"} value={userDetails?.password} handleOnChange={handleUserDetails} endicon={true} data={userDetails} validation={userLoginError?.status === false ? true : false} iconname={"toggle-icon"}/>
        </section>
        <button className='login-btn' onClick={() => {
            handleAppLogin(userDetails?.username, userDetails?.password, dispatch, navigate, "LogIn")
          }} disabled={userLoginLoading}>Log In</button>
        <div className='signup-info-container'>
          <span>Don't have an account? <u className='signup-info-btn' onClick={() => {
              dispatch(userLoginReset());
              navigate('/signup');
            }}>Sign up</u></span>
        </div>
    </div>
  )
}

export default LoginPage;