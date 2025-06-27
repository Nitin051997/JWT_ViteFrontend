import { updateUserAccessAction } from "../services/UserUpdate/updateUserAccess";
import { handleBrowserDetails } from "./handleBrowserDetails";
import { handleMessageBar } from "./handleMessageBar";

export const handleUserCredential = async (location, data, dispatch, refreshUserProfile) => {
    if(location?.state?.userId && data?.userName){
        let response = await dispatch(updateUserAccessAction({
            UserDetails: {
                userId: location?.state?.userId, 
                username: data?.userName, 
                status: data?.status, 
                dispatch: dispatch,
                sysDetails: handleBrowserDetails()
            }
        }));
        if(response?.payload?.status){
            refreshUserProfile();
        }
    } else if(data?.status === "Account Rejected") {
        handleMessageBar(dispatch, true, 3000, "warning", "Account is in Rejected State, Kindly Activate it.", "bottom", "right");
    } else {
        handleMessageBar(dispatch, true, 3000, "error", "Action Denied, Kindly provide proper details.", "bottom", "right")
    }
}