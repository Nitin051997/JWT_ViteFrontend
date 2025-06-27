import React, { useCallback, useEffect, useState } from 'react';
import '../../css/SignupPage.css';
import { InputField } from '../../elements/InputField';
import { getRandomPatern } from '../../utils/getRandomPatern';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAppSignup } from '../../utils/hanldeAppSignup';

const SignupPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    username: "", name: "", password: "", showPassword: false, repassword: "", showRePassword: false, geterateOTP: "", matchOTP: "", passwordValidation: false, patternValidation: false, buttonAction: false
  });
  const { userSignupLoading } = useSelector((state) => state?.userSignupReducer);

  const handleUserDetails = useCallback((event) => {
    const { name, value } = event.target;
  
    setSignupDetails((prevData) => {
      switch (name) {
        case "username":
        case "name":
        case "password":
        case "repassword":
        case "matchOTP":
          return { ...prevData, [name]: value, passwordValidation: false, patternValidation: false };
  
        case "password-icon":
          return { ...prevData, showPassword: !prevData.showPassword };
  
        case "repassword-icon":
          return { ...prevData, showRePassword: !prevData.showRePassword };
  
        default:
          return prevData;
      }
    });
  }, []);
  

  const handleRefreshOTP = () => {
    let OTP = getRandomPatern(4);
    setSignupDetails((prevData) => {
      return {...prevData, geterateOTP: OTP};
    });
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleAppSignup(dispatch, signupDetails, setSignupDetails, navigate);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    if(signupDetails?.geterateOTP === ""){
      handleRefreshOTP();
    }
  return () => {
    window.removeEventListener("keydown", handleKeyPress);
  }
  });

  return (
    <div className='signup-page-container'>
        <section className='signup-page-input'>
          <InputField name={"username"} label={"User Name"} inputsize={"medium"} inputcolor={"#4D6DCC"} inputradius={"20px"} type={"text"} textcolor={"#DADADA"} textsize={"20px"} value={signupDetails?.username} handleOnChange={(event) => handleUserDetails(event)} validation={false}/>
          <InputField name={"name"} label={"Name"} inputsize={"medium"} inputcolor={"#4D6DCC"} inputradius={"20px"} type={"text"} textcolor={"#DADADA"} textsize={"20px"} value={signupDetails?.name} handleOnChange={(event) => handleUserDetails(event)} validation={false}/>
          <InputField name={"password"} label={"Password"} inputsize={"medium"} inputcolor={"#4D6DCC"} inputradius={"20px"} type={signupDetails?.showPassword ? "text" : "password"} textcolor={"#DADADA"} textsize={"20px"} value={signupDetails?.password} handleOnChange={(event) => handleUserDetails(event)} validation={signupDetails?.passwordValidation} endicon={true} data={signupDetails} iconname={"password-icon"}/>
          <InputField name={"repassword"} label={"Re-Type Password"} inputsize={"medium"} inputcolor={"#4D6DCC"} inputradius={"20px"} type={signupDetails?.showRePassword ? "text" : "password"} textcolor={"#DADADA"} textsize={"20px"} value={signupDetails?.repassword} handleOnChange={(event) => handleUserDetails(event)} validation={signupDetails?.passwordValidation} endicon={true} data={signupDetails} iconname={"repassword-icon"}/>
        </section>
        <section className='signup-page-otp'>
          <button className='signup-page-otp-btn' onClick={() => handleRefreshOTP()}>
            <img className='signup-page-otp-img' alt='Refresh' src={new URL(`../../assets/buttonIcon/Refresh.png`, import.meta.url).href} />
          </button>
          <span className='signup-page-otp-text select-text-disable'>
            <i>{signupDetails?.geterateOTP}</i>
          </span>
          <InputField name={"matchOTP"} label={"Pattern"} inputsize={"small"} width={"150px"} inputcolor={"#4D6DCC"} inputradius={"20px"} type={"text"} textcolor={"#DADADA"} textsize={"20px"} value={signupDetails?.matchOTP} handleOnChange={(event) => handleUserDetails(event)} validation={signupDetails?.patternValidation}/>
        </section>
        <button className='signup-btn' onClick={() => {
            handleAppSignup(dispatch, signupDetails, setSignupDetails, navigate);
          }} disabled={userSignupLoading}>Sign Up</button>
        <div className='login-info-container select-text-disable'>
          <span>Already have an account? <u className='login-info-btn' onClick={() => {navigate('/')}}>Log In</u></span>
        </div>
    </div>
  )
}

export default SignupPage;