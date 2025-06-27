import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserDetailsReset } from '../../services/UserInfo/getAllUserDetails';
import StackViewerLayout from '../../layouts/StackViewerLayout';
import Searchbar from '../../elements/Searchbar';
import StackViewerCard, { StackViewerCardLoader } from '../../components/stackViewerCard/StackViewerCard';
import AppPagination from '../../components/appPagination/AppPagination';
import { useNavigate } from 'react-router-dom';
import StackViewerNavTab from '../../components/stackViewerNavTab/StackViewerNavTab';
import { handleAppuserList } from '../../utils/handleAppUserList';
import { handleUserProfile } from '../../utils/handleUserProfile';
import { navigateBackGlobalStateReset } from '../../services/NavigateBack/navigateBack';
import AppPaginationLoader from '../../components/appPagination/AppPaginationLoader';
import DataNotFound from '../../components/dataNotFound/DataNotFound';

const ListOfUser = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { getAllUserDetailsLoading, getAllUserDetailsData, getAllUserDetailsError } = useSelector((state) => state?.getAllUserDetailsReducer);
    const { previousPage } = useSelector((state) => state?.navigateBackGlobalState);

    const [page, setPage] = useState( previousPage || 1);
    const [userSearch, setUserSearch] = useState("");

    const fetchUserList = useCallback( async(data) => {
        await handleAppuserList(dispatch, data, page, setPage, userSearch, setUserSearch)
    }, [dispatch, page, userSearch]);

    const directToUserProfile = useCallback( async(data) => {
        await handleUserProfile(dispatch, navigate, data, page, "getData");
    }, [dispatch, navigate, page]);

    useEffect(() => {
        if(getAllUserDetailsData === null){
            fetchUserList({ type: "", value: ""});
        }
    },[getAllUserDetailsData, fetchUserList]);

    useEffect(() => {
        return () => {
            if(window.location.pathname !== "/userlist"){
                dispatch(getAllUserDetailsReset());
                dispatch(navigateBackGlobalStateReset());
            }
        }
    });
    
    return (
    <>
        <StackViewerLayout 
            StackViewerType={"ListOfUserContainer"}
            StackViewerLoading={getAllUserDetailsLoading}
            StackViewerData={getAllUserDetailsData}
            StackViewerError={getAllUserDetailsError}
            StackViewerNavigator={navigate}
            StackViewerHeader={
                {
                    StackViewerNavTab: StackViewerNavTab, 
                    StackViewerReloader: fetchUserList,
                    StackViewerTitle: "Users List:", 
                    StackViewerSearchBar: Searchbar, 
                    StackViewerSearchBarToolTip: "Search By User Name", 
                    StackViewerSearchBarValue: userSearch, 
                    StackViewerSearchBarOnChange: fetchUserList 
                }
            }
            StackViewerBody={
                {
                    StackViewerCard: StackViewerCard,
                    StackViewerCardLoader: StackViewerCardLoader,
                    StackViewerCardAction: directToUserProfile,
                    StackViewerCardNoData: DataNotFound,
                }
            }
            StackViewerFooter={
                {
                    StackViewerPagination: AppPagination,
                    StackViewerPaginationLoader: AppPaginationLoader,
                    StackViewerPaginationPage: page,
                    StackViewerPaginationType: "primary",
                    StackViewerPaginationFunction: fetchUserList
                }
            }
        />
    </>
    )
}

export default ListOfUser;