import { Pagination } from '@mui/material';
// color: primary, secondary
// variant: outlined
// shape: rounded
// size: small, large

const AppPagination = (props) => {

  const handleChange = (event, page) => {
    if(event?.type === "click"){
      props?.handlePagination({type: "handlePage", value: page});
    }
  };

  return (
    <>
        <Pagination count={props?.count} color={props?.color} variant={props?.variant} shape={props?.shape} size={props?.size} onChange={handleChange} page={props?.page || 1}/>
    </>
  )
}

export default AppPagination;