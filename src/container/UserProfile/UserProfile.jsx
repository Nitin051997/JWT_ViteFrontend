import { useCallback, useEffect, useState } from 'react';
import ProfileViewerLayout from '../../layouts/ProfileViewerLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import StackViewerNavTab from '../../components/stackViewerNavTab/StackViewerNavTab';
import ProfileInformation, { ProfileInformationLoader } from '../../components/profileElements/ProfileInformation';
import ProfileCredentials, { ProfileCredentialsLoader } from '../../components/profileElements/ProfileCredentials';
import ProfileSession, { ProfileSessionLoader } from '../../components/profileElements/ProfileSession';
import { useDispatch, useSelector } from 'react-redux';
import { navigateBackGlobalStateValues } from '../../services/NavigateBack/navigateBack';
import { handleUserProfile } from '../../utils/handleUserProfile';
import { getSpecificUserCredentialReset, getSpecificUserInformationReset, getSpecificUserServicesReset, getSpecificUserSessionReset, getSpecificUserSummaryReset } from '../../services/UserInfo/getSpecificUser';
import { handleUserCredential } from '../../utils/handleUserCredential';
import { copyToClipboard } from '../../utils/copyToClipboard';
import ProfileServices, { ProfileServicesLoader } from '../../components/profileElements/ProfileServices';
import ProfileSummary, { ProfileSummaryLoader } from '../../components/profileElements/ProfileSummary';

const UserProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { 
        getSpecificUserInformationLoading,
        getSpecificUserInformationData,
        getSpecificUserInformationError,
        getSpecificUserCredentialLoading,
        getSpecificUserCredentialData,
        getSpecificUserCredentialError,
        getSpecificUserSessionLoading,
        getSpecificUserSessionData,
        getSpecificUserSessionError,
        getSpecificUserServicesLoading,
        getSpecificUserServicesData,
        getSpecificUserServicesError,
        getSpecificUserSummaryLoading,
        getSpecificUserSummaryData,
        getSpecificUserSummaryError,
    } = useSelector((state) => state?.getSpecificUserReducer);

    const [profileButtonEvent, setProfileButtonEvent] = useState({ showPassword: false, serviceInfo: null, timeLine: null, sessionDetails: null });

    const refreshUserProfile = useCallback( async() => {
        await handleUserProfile(dispatch, navigate, { userId: location?.state?.userId }, "", "refresh");
    }, [dispatch, navigate, location]);

    const handleUserCredentialDataStatus = useCallback( async (data) => {
        await handleUserCredential(location, data, dispatch, refreshUserProfile);
    }, [dispatch, location, refreshUserProfile])

    const directToUserlist = () => {
        navigate(-1);
        dispatch(navigateBackGlobalStateValues({ previousPage: location?.state?.page }))
    };

    const handleCopyToClipboard = async (data) => {
        await copyToClipboard(dispatch, data);
    };

    const hanldeProfileButtonEvent = useCallback((type, data) => {
        if(type === "Password Action"){
            setProfileButtonEvent((prev) => {
                return { ...prev, showPassword: !profileButtonEvent?.showPassword }
            })
        } else if(type === "Services Info Action"){
            setProfileButtonEvent((prev) => {
                return {...prev, serviceInfo: data === prev?.serviceInfo ? null : data}
            })
        } else if(type === "Summary TimeLine Action"){
            setProfileButtonEvent((prev) => {
                return {...prev, serviceInfo: null, timeLine: data === prev?.timeLine ? null : data}
            })
        } else if(type === "Summary Details Action"){
            setProfileButtonEvent((prev) => {
                return {...prev, sessionDetails: data === prev?.sessionDetails ? null : data}
            })
        }
    }, [profileButtonEvent]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(event.target.className !== "profile-services-list-data-info"){
                if(profileButtonEvent?.serviceInfo !== null && event.target.className !== "profile-services-list-data-info-container"){
                    setProfileButtonEvent((prev) => {
                        return {...prev, serviceInfo: null}
                    })
                }
            }
        };
        if(getSpecificUserInformationData === null && getSpecificUserCredentialData === null  && getSpecificUserSessionData === null && window.location.pathname === "/userprofile" ){
            refreshUserProfile();
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
          };
    },[getSpecificUserInformationData, getSpecificUserCredentialData, getSpecificUserSessionData, refreshUserProfile, profileButtonEvent?.serviceInfo]);

    useEffect(() => {
        return () => {
            if(window.location.pathname !== "/userprofile"){
                dispatch(getSpecificUserInformationReset());
                dispatch(getSpecificUserCredentialReset());
                dispatch(getSpecificUserSessionReset());
                dispatch(getSpecificUserSummaryReset());
                dispatch(getSpecificUserServicesReset());
            }
        }
    })

  return (
    <>
        <ProfileViewerLayout 
            ProfileViewerType={"UserProfileContainer"}
            ProfileViewerNavigator={directToUserlist}
            ProfileViewerHeader={
                {
                    ProfileViewerNavTab: StackViewerNavTab, 
                    ProfileViewerReloader: refreshUserProfile, 
                    ProfileViewerTitle: "User Profile: ",
                    ProfileViewerNavType: "Function",
                }
            }
            ProfileViewerBody={
                {
                    ProfileInformationState: { ProfileInformationLoading: getSpecificUserInformationLoading, ProfileInformationData: getSpecificUserInformationData, ProfileInformationError: getSpecificUserInformationError },
                    ProfileInformation: ProfileInformation,
                    ProfileInformationLoader: ProfileInformationLoader,
                    ProfileCredentialsState: { ProfileCredentialsLoading: getSpecificUserCredentialLoading, ProfileCredentialsData: getSpecificUserCredentialData, ProfileCredentialsError: getSpecificUserCredentialError, ProfileCredentialsButton: profileButtonEvent, ProfileCredentialsButtonFunction: hanldeProfileButtonEvent, ProfileCredentialsDataStatus: handleUserCredentialDataStatus },
                    ProfileCredentials: ProfileCredentials,
                    ProfileCredentialsLoader: ProfileCredentialsLoader,
                    ProfileSessionState: { ProfileSessionLoading: getSpecificUserSessionLoading, ProfileSessionData: getSpecificUserSessionData, ProfileSessionError: getSpecificUserSessionError, ProfileCredentialsDataStatus: handleUserCredentialDataStatus, ProfileSessionCopyToClipboard: handleCopyToClipboard },
                    ProfileSession: ProfileSession,
                    ProfileSessionLoader: ProfileSessionLoader,
                    ProfileServicesState: { ProfileServicesLoading: getSpecificUserServicesLoading, ProfileServicesData: getSpecificUserServicesData, ProfileServicesError: getSpecificUserServicesError, ProfileServicesButtonFunction: hanldeProfileButtonEvent, profileButtonEvent: profileButtonEvent },
                    ProfileServices: ProfileServices,
                    ProfileServicesLoader: ProfileServicesLoader,
                    ProfileSummaryState: { ProfileSummaryLoading: getSpecificUserSummaryLoading, ProfileSummaryData: getSpecificUserSummaryData, ProfileSummaryError: getSpecificUserSummaryError, ProfileSummaryButtonFunction: hanldeProfileButtonEvent, profileButtonEvent: profileButtonEvent, ProfileSummarySessionButtonFunction: hanldeProfileButtonEvent },
                    ProfileSummary: ProfileSummary,
                    ProfileSummaryLoader: ProfileSummaryLoader,
                }
            }
        />
    </>
  )
}

export default UserProfile;