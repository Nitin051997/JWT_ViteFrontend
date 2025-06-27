import React, { useLayoutEffect, useRef } from 'react';
import '../css/StackViewerLayout.css';
import { getRandomPatern } from '../utils/getRandomPatern';
import gsap from 'gsap';
import { formatDateTime } from '../utils/formatDateTime';

const StackViewerLayout = (props) => {

  const stackViewerList = useRef([]);

  useLayoutEffect(() => {
    if (!stackViewerList?.current?.length) return; // ✅ Ensure refs exist before animating
    gsap.fromTo(
      stackViewerList?.current?.filter((el) => el), // ✅ Filter out null refs
      { opacity: 0, y: 50 }, // Start position
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1, // Delay between items
        ease: "power2.out",
      }
    );
  }, [props?.StackViewerData]);

  return (
    <main className='stack-viewer-layout select-text-disable'>
      <nav className='stack-viewer-layout-navbar'>
        {
          props?.StackViewerType === "ListOfUserContainer" 
          ? (
            <>
              <props.StackViewerHeader.StackViewerNavTab navtablabel={{nav: "Back", reload: "Reload", containerTitle: props?.StackViewerHeader?.StackViewerTitle }} StackViewerNavigator={props?.StackViewerNavigator} StackViewerReloader={props?.StackViewerHeader?.StackViewerReloader} />
              <div className='stack-viewer-layout-searchbar'>
                <props.StackViewerHeader.StackViewerSearchBar title={props?.StackViewerHeader?.StackViewerSearchBarToolTip} value={props?.StackViewerHeader?.StackViewerSearchBarValue} onChange={props?.StackViewerHeader?.StackViewerSearchBarOnChange} />
              </div>
            </>
            ) 
          : (<></>)
        }
      </nav>
      <section className='stack-viewer-layout-body App-custom-scroll-bar'>
        {
          props?.StackViewerType === "ListOfUserContainer" 
          ? (
            <>
              {
                props?.StackViewerLoading
                ? <>
                    <props.StackViewerBody.StackViewerCardLoader numberOfTimes={ window.innerWidth > 970 ? 4 : 3 } />
                  </> 
                : !props?.StackViewerLoading && props?.StackViewerData?.status && props?.StackViewerData?.data?.length > 0 && !props?.StackViewerError 
                ? (
                  <>{
                      props?.StackViewerData?.data?.map((data, index) => {
                        let iconcolor = getRandomPatern(4, "numbers");
                        let StackViewerData = {
                          icon: {
                            iconColor: iconcolor, 
                            iconLabel: data?.username || "U"
                          },
                          information: [
                            {informationLabel: "User Name: ", informationValue: data?.username || "NA"},
                            {informationLabel: "Account Status: ", informationValue: data?.status || "NA"}
                          ],
                          zone: [
                            {zoneLabel: "Log In: ", zoneValue: data?.latestLogedIn&&data?.latestLogedIn !== "" ? formatDateTime({type: "DateAndTime", value: data?.latestLogedIn}) : "-- / -- / -- , 00:00:00"},
                            {zoneLabel: "Log Out: ", zoneValue: data?.latestLogedOut&&data?.latestLogedOut !== "" ? formatDateTime({type: "DateAndTime", value: data?.latestLogedOut}) : "-- / -- / -- , 00:00:00"}
                          ],
                          status: {statusLabel: "Log In", statusValue: data?.logedIn},
                          action: {
                            actionLabel: "View Details", 
                            actionButton: () => props?.StackViewerBody?.StackViewerCardAction({userId: data?.userId, path: "/userprofile" })
                          }
                        };
                      return (
                            <div
                              key={index}
                              ref={(el) => {
                                if (el) stackViewerList.current[index] = el; // ✅ Only assign non-null elements
                                }}
                              style={{ opacity: 0 }} // Ensures animation starts properly
                            >
                              <props.StackViewerBody.StackViewerCard stackData={StackViewerData} key={index} stackKey={"stack" + index} />
                            </div>
                          )
                        }
                      )
                    }</>
                  ) 
                : !props?.StackViewerLoading && props?.StackViewerData?.status && props?.StackViewerData?.data?.length === 0 && !props?.StackViewerError 
                ? <>
                    <props.StackViewerBody.StackViewerCardNoData type={"Not Data"} message={"No User Found."} />
                  </>
                : !props?.StackViewerLoading && !props?.StackViewerData && props?.StackViewerError?.status === false && props?.StackViewerError?.message 
                ? <>
                    <props.StackViewerBody.StackViewerCardNoData type={"No Services"} message={props?.StackViewerError?.message} />
                  </> 
                : !props?.StackViewerLoading && !props?.StackViewerData && props?.StackViewerError?.message?.includes('Network error: ') 
                ? <>
                    <props.StackViewerBody.StackViewerCardNoData type={"Network Error"} message={"Network error: Unable to connect to the server, Please check your connection."} />
                  </> 
                : <></>
              }
            </>
            ) 
          : (<></>)
        }
      </section>
      <footer className='stack-viewer-layout-footer'>
        {
          props?.StackViewerType === "ListOfUserContainer" 
          ? (
            <>
              {
                props?.StackViewerLoading 
                ? <>
                    <props.StackViewerFooter.StackViewerPaginationLoader />
                  </> 
                : !props?.StackViewerLoading && props?.StackViewerData?.status && !props?.StackViewerError 
                ? <props.StackViewerFooter.StackViewerPagination count={props?.StackViewerData?.lastpage} page={props?.StackViewerFooter?.StackViewerPaginationPage} color={props?.StackViewerFooter?.StackViewerPaginationType} handlePagination={props?.StackViewerFooter?.StackViewerPaginationFunction} /> 
                : <></>
              }
            </>
            ) 
          : (<></>)
        }
      </footer>
    </main>
  )
}

export default StackViewerLayout;