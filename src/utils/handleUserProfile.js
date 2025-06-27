import { getSpecificUserCredentialAction, getSpecificUserInformationAction, getSpecificUserServicesAction, getSpecificUserSessionAction, getSpecificUserSummaryAction } from "../services/UserInfo/getSpecificUser";
import { handleMessageBar } from "./handleMessageBar";

export const handleUserProfile = (dispatch, navigate, data, page, type) => {
    if(data?.userId){
        dispatch(getSpecificUserInformationAction({GetUserDetails: {dispatch: dispatch, getId: data?.userId, type: "User Information"}}));
        dispatch(getSpecificUserCredentialAction({GetUserDetails: {dispatch: dispatch, getId: data?.userId, type: "User Credential"}}));
        dispatch(getSpecificUserSessionAction({GetUserDetails: {dispatch: dispatch, getId: data?.userId, type: "User Session"}}));
        dispatch(getSpecificUserServicesAction({GetUserDetails: {dispatch: dispatch, getId: data?.userId, type: "User Services"}}));
        dispatch(getSpecificUserSummaryAction({GetUserDetails: {dispatch: dispatch, getId: data?.userId, type: "User Summay"}}));
        if(type !== "refresh"){
            setTimeout(() => {
                navigate(data?.path, {
                    state: {page: page, userId: data?.userId},
                });
            }, 50);
        }
    } else {
        handleMessageBar(dispatch, true, 3000, "error", "User details unavailable.", "bottom", "right")
    }
};