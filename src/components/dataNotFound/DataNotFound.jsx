import '../../css/DataNotFound.css';

const DataNotFound = (props) => {
  return (
    <>
        <div className='data-not-found-container'>
            {
            props?.type === "Not Data" 
            ? <><img className='no-data-image' src={new URL(`../../assets/appGraphic/NoData.jpg`, import.meta.url).href} alt='No Data' /></> 
            : 
            props?.type === "No Services" 
            ? <><img className='no-services-image' src={new URL(`../../assets/appGraphic/NoServices.jpg`, import.meta.url).href} alt='No Services' /></>
            :
            props?.type === "Network Error" 
            ? <><img className='network-error-image' src={new URL(`../../assets/appGraphic/NoNetwork.jpg`, import.meta.url).href} alt='Network Error' /></>
            :
            <></>
            }
            <span className='data-not-found-message'>{props?.message}</span>
        </div>
    </>
  )
}

export default DataNotFound