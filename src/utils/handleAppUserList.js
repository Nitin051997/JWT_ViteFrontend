import { getAllUserDetailsAction } from "../services/UserInfo/getAllUserDetails";

export const handleAppuserList = (dispatch, data, page, setPage, userSearch, setUserSearch) => {
        let { type, value } = data;
        if(type === "handlePage") setPage(value);
        if(type === "handleSearch") setUserSearch(value);
        let GetUsersDetails = {dispatch: dispatch, page: type === "handlePage" ? value : page, search: type === "handleSearch" ? value : userSearch};
        dispatch(getAllUserDetailsAction({GetUsersDetails}));
};