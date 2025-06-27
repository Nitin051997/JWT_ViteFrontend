import { showDialogBoxGlobalStateReset } from "../services/AlertBox/showDialogBox";
import { handleAppLogout } from "./handleAppLogout";
import { handleDialogBox } from "./handleDialogBox";

export const appTimer = (setTimer, duration, flow, dispatch, navigate) => {
    let timeLeft = duration * 60;

    const timerInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));

      if (timeLeft === 30) {
        handleDialogBox(dispatch, true, "sessiontimeout", "Alert!", "Kindly press continue button to stay Logged In, Your Session is getting Time Out with in", "", "");
      } else if(timeLeft === 0){
        if(flow === "timeout"){
            clearInterval(timerInterval);
            handleAppLogout( dispatch, getUserStatus?.username, navigate, "LogOut" );
            dispatch(showDialogBoxGlobalStateReset());
        }
      }

      timeLeft--;

      if(flow === "timeout"){
        setTimer(`${minutes > 9 ? minutes : "0" + minutes }:${seconds < 10 ? '0' + seconds : seconds}`);
      }

    }, 1000);
};