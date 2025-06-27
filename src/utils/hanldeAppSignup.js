import { userSignupAction } from "../services/UserAccess/userSignup";
import { handleMessageBar } from "./handleMessageBar";

export const handleAppSignup = ( dispatch, signupDetails, setSignupDetails, navigate ) => {
    if(signupDetails?.username !== "" && signupDetails?.name !== "" && signupDetails?.password !== "" && signupDetails?.repassword !== "" && signupDetails?.matchOTP !== ""){
      if(signupDetails?.password === signupDetails?.repassword){
        if(signupDetails?.geterateOTP === signupDetails?.matchOTP){
          let CreateUserDetails = {dispatch: dispatch, navigate: navigate, username: signupDetails?.username, password: signupDetails?.password, name: signupDetails?.name}
          dispatch(userSignupAction({CreateUserDetails}));
        } else {
          setSignupDetails((prevData) => {
            return {...prevData, patternValidation: true};
          });
          handleMessageBar(dispatch, true, 3000, "error", "Pattern doesn't Matching", "bottom", "right");
        }
      } else {
        setSignupDetails((prevData) => {
          return {...prevData, passwordValidation: true};
        });
        handleMessageBar(dispatch, true, 3000, "error", "Password doesn't Matching", "bottom", "right");
      }
    } else {
      handleMessageBar(dispatch, true, 3000, "warning", "Kindly Fill and the Details", "bottom", "center");
    }
}