import { Skeleton } from '@mui/material';

const AppPaginationLoader = () => {
  return (
    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
    </div>
  )
}

export default AppPaginationLoader