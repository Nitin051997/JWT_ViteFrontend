import { mobileTabPanelGlobalStateReset } from "../services/MobileTabPanel/mobileTabPanel";
import { userLogoutAction } from "../services/UserAccess/userLogout";
import { handleBrowserDetails } from "./handleBrowserDetails";

export const handleAppLogout = (dispatch, username, navigate, type) => {
    
    dispatch(userLogoutAction({UserDetails: {username: username, dispatch: dispatch, navigate: navigate, type: type, sysDetails: handleBrowserDetails()}}));
    dispatch(mobileTabPanelGlobalStateReset());

}