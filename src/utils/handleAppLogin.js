import { userLoginAction } from "../services/UserAccess/userLogin";
import { handleBrowserDetails } from "./handleBrowserDetails";
import { handleMessageBar } from "./handleMessageBar";

export const handleAppLogin = (username, password, dispatch, navigate, type) => {
  if(username?.length > 0 && password?.length > 0){
    let LoginDetails = { username: username, password: password, dispatch: dispatch, navigate: navigate, type: type, sysDetails: handleBrowserDetails() }
    dispatch(userLoginAction({LoginDetails}));
  } else {
    handleMessageBar(dispatch, true, 3000, "error", "Kindly Fill all the Credentials", "bottom", "right");
  }
}