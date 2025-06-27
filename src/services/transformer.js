import { combineReducers } from "@reduxjs/toolkit";
import userLoginReducer from "./UserAccess/userLogin";
import userSignupReducer from "./UserAccess/userSignup";
import userLogoutReducer from "./UserAccess/userLogout";
import userVerificationReducer from "./UserAccess/userVerification";
import showMessageBoxGlobalState from "./AlertBox/showMessageBox";
import showDialogBoxGlobalState from "./AlertBox/showDialogBox";
import getAllUserDetailsReducer from "./UserInfo/getAllUserDetails";
import getSpecificUserReducer from "./UserInfo/getSpecificUser";
import navigateBackGlobalState from "./NavigateBack/navigateBack";
import appLoaderGlobalState from "./AppLoader/appLoader";
import appTabPanelGlobalState from "./AppTabPanel/appTabPanel";
import appMenuReducer from "./AppMenu/appMenu";
import mobileTabPanelGlobalState from "./MobileTabPanel/mobileTabPanel";

export const transformer = combineReducers({
    userLoginReducer: userLoginReducer,
    userSignupReducer: userSignupReducer,
    userLogoutReducer: userLogoutReducer,
    userVerificationReducer: userVerificationReducer,
    showMessageBoxGlobalState: showMessageBoxGlobalState,
    showDialogBoxGlobalState: showDialogBoxGlobalState,
    getAllUserDetailsReducer: getAllUserDetailsReducer,
    getSpecificUserReducer: getSpecificUserReducer,
    navigateBackGlobalState: navigateBackGlobalState,
    appLoaderGlobalState: appLoaderGlobalState,
    appTabPanelGlobalState: appTabPanelGlobalState,
    appMenuReducer: appMenuReducer,
    mobileTabPanelGlobalState: mobileTabPanelGlobalState,
});

export default transformer;