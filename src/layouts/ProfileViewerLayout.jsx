import React from 'react';
import '../css/ProfileViewerLayout.css';
import { formatDateTime } from '../utils/formatDateTime';

const ProfileViewerLayout = (props) => {
  return (
    <main className='profile-viewer-layout select-text-disable'>
        <nav className='profile-viewer-layout-navbar'>
            {
            props?.ProfileViewerType === "UserProfileContainer" 
            ? (
                <>
                <props.ProfileViewerHeader.ProfileViewerNavTab navtablabel={{nav: "Back", reload: "Reload", containerTitle: props?.ProfileViewerHeader?.ProfileViewerTitle }} StackViewerNavigator={props?.ProfileViewerNavigator} StackViewerReloader={() => props?.ProfileViewerHeader?.ProfileViewerReloader()} />
                </>
                ) 
            : (<></>)
            }
        </nav>
        <div className='profile-viewer-layout-body App-custom-scroll-bar'>
            <section className='profile-viewer-layout-body-information'>
                {
                props?.ProfileViewerType === "UserProfileContainer" 
                ? (
                    <>
                    {
                        props?.ProfileViewerBody?.ProfileInformationState?.ProfileInformationLoading 
                        ? 
                        <>
                          <props.ProfileViewerBody.ProfileInformationLoader numberOfTimes={2} />
                        </> 
                        : !props?.ProfileViewerBody?.ProfileInformationState?.ProfileInformationLoading && props?.ProfileViewerBody?.ProfileInformationState?.ProfileInformationData?.status && !props?.ProfileViewerBody?.ProfileInformationState?.ProfileInformationError 
                        ? (
                        <>{
                            [{ profileInfoLeftValue: props?.ProfileViewerBody?.ProfileInformationState?.ProfileInformationData?.data?.name, profileInfoLeftLabel: "Name", profileInfoRightValue: props?.ProfileViewerBody?.ProfileInformationState?.ProfileInformationData?.data?.userId, profileInfoRightLabel: "ID" }, { profileInfoLeftValue: props?.ProfileViewerBody?.ProfileInformationState?.ProfileInformationData?.data?.status, profileInfoLeftLabel: "Status", profileInfoRightValue: props?.ProfileViewerBody?.ProfileInformationState?.ProfileInformationData?.data?.createdOn&&props?.ProfileViewerBody?.ProfileInformationState?.ProfileInformationData?.data?.createdOn !== "" ? formatDateTime({type: "", value: props?.ProfileViewerBody?.ProfileInformationState?.ProfileInformationData?.data?.createdOn}) : "-- / -- / --" , profileInfoRightLabel: "Created On" }].map((profileInfo, index) => {
                                return (<props.ProfileViewerBody.ProfileInformation profileInfo={profileInfo} key={index}/>)
                            })
                        }</>
                        ) 
                        : 
                        <>
                          <props.ProfileViewerBody.ProfileInformationLoader numberOfTimes={2} />
                        </>
                    }
                    {
                        props?.ProfileViewerBody?.ProfileCredentialsState?.ProfileCredentialsLoading 
                        ? 
                        <>
                            <props.ProfileViewerBody.ProfileCredentialsLoader />
                        </> 
                        : !props?.ProfileViewerBody?.ProfileCredentialsState?.ProfileCredentialsLoading && props?.ProfileViewerBody?.ProfileCredentialsState?.ProfileCredentialsData?.status && !props?.ProfileViewerBody?.ProfileCredentialsState?.ProfileCredentialsError 
                        ? (
                        <>{
                            <props.ProfileViewerBody.ProfileCredentials username={props?.ProfileViewerBody?.ProfileCredentialsState?.ProfileCredentialsData?.data?.username} password={props?.ProfileViewerBody?.ProfileCredentialsState?.ProfileCredentialsData?.data?.password} orgnization={props?.ProfileViewerBody?.ProfileCredentialsState?.ProfileCredentialsData?.data?.orgnization} status={props?.ProfileViewerBody?.ProfileCredentialsState?.ProfileCredentialsData?.data?.status} ProfileCredentialsButton={props?.ProfileViewerBody?.ProfileCredentialsState?.ProfileCredentialsButton} ProfileCredentialsButtonFunction={props?.ProfileViewerBody?.ProfileCredentialsState?.ProfileCredentialsButtonFunction} ProfileCredentialsDataStatus={props?.ProfileViewerBody?.ProfileCredentialsState?.ProfileCredentialsDataStatus}/>
                        }</>
                        ) 
                        : 
                        <>
                            <props.ProfileViewerBody.ProfileCredentialsLoader />
                        </>
                    }
                    {
                        props?.ProfileViewerBody?.ProfileSessionState?.ProfileSessionLoading 
                        ? 
                        <>
                            <props.ProfileViewerBody.ProfileSessionLoader />
                        </> 
                        : !props?.ProfileViewerBody?.ProfileSessionState?.ProfileSessionLoading && props?.ProfileViewerBody?.ProfileSessionState?.ProfileSessionData?.status && !props?.ProfileViewerBody?.ProfileSessionState?.ProfileSessionError 
                        ? (
                        <>{
                            <props.ProfileViewerBody.ProfileSession token={props?.ProfileViewerBody?.ProfileSessionState?.ProfileSessionData?.data?.webToken} status={props?.ProfileViewerBody?.ProfileSessionState?.ProfileSessionData?.data?.status} logedIn={props?.ProfileViewerBody?.ProfileSessionState?.ProfileSessionData?.data?.logedIn} username={props?.ProfileViewerBody?.ProfileSessionState?.ProfileSessionData?.data?.username} ProfileCredentialsDataStatus={props?.ProfileViewerBody?.ProfileSessionState?.ProfileCredentialsDataStatus} ProfileSessionCopyToClipboard={props?.ProfileViewerBody?.ProfileSessionState?.ProfileSessionCopyToClipboard}/>
                        }</>
                        ) 
                        : 
                        <>
                            <props.ProfileViewerBody.ProfileSessionLoader />
                        </>
                    }
                    </>
                    ) 
                : (<></>)
                }
            </section>
            <section className='profile-viewer-layout-body-analytic'>
                {
                props?.ProfileViewerType === "UserProfileContainer" 
                ? (
                    <>
                        {
                            props?.ProfileViewerBody?.ProfileSummaryState?.ProfileSummaryLoading 
                            ? 
                            <>
                                <props.ProfileViewerBody.ProfileSummaryLoader />
                            </> 
                            : !props?.ProfileViewerBody?.ProfileSummaryState?.ProfileSummaryLoading && props?.ProfileViewerBody?.ProfileSummaryState?.ProfileSummaryData?.status && !props?.ProfileViewerBody?.ProfileSummaryState?.ProfileSummaryError 
                            ? 
                            <>
                                <props.ProfileViewerBody.ProfileSummary timeLineContactDetails={props?.ProfileViewerBody?.ProfileSummaryState?.ProfileSummaryData?.data?.contactDetails || []} timeLineHistoryDetails={props?.ProfileViewerBody?.ProfileSummaryState?.ProfileSummaryData?.data?.sessionLog || []} timeLineFunction={props?.ProfileViewerBody?.ProfileSummaryState?.ProfileSummaryButtonFunction} timeLineState={props?.ProfileViewerBody?.ProfileSummaryState?.profileButtonEvent} timeLineHistoreFunction={props?.ProfileViewerBody?.ProfileSummaryState?.ProfileSummarySessionButtonFunction}/>
                            </> 
                            : 
                            <>
                                <props.ProfileViewerBody.ProfileSummaryLoader />
                            </>
                        }
                        {
                            props?.ProfileViewerBody?.ProfileServicesState?.ProfileServicesLoading 
                            ? 
                            <>
                                <props.ProfileViewerBody.ProfileServicesLoader />
                            </> 
                            : !props?.ProfileViewerBody?.ProfileServicesState?.ProfileServicesLoading && props?.ProfileViewerBody?.ProfileServicesState?.ProfileServicesData?.status && !props?.ProfileViewerBody?.ProfileServicesState?.ProfileServicesError 
                            ? 
                            <>
                                <props.ProfileViewerBody.ProfileServices listData={props?.ProfileViewerBody?.ProfileServicesState?.ProfileServicesData?.data || []} infoFunction={props?.ProfileViewerBody?.ProfileServicesState?.ProfileServicesButtonFunction} infoState={props?.ProfileViewerBody?.ProfileServicesState?.profileButtonEvent?.serviceInfo} />
                            </>
                            : 
                            <>
                                <props.ProfileViewerBody.ProfileServicesLoader />
                            </>
                        }
                    </>
                ) 
                : (<></>)
                }
            </section>
        </div>
    </main>
  )
}

export default ProfileViewerLayout;