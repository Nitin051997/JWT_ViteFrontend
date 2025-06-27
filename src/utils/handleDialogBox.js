import { showDialogBoxGlobalStateValues } from '../services/AlertBox/showDialogBox';

export const handleDialogBox = (dispatch, status, type, title, information, clearButton, actionButton) => {

    dispatch(showDialogBoxGlobalStateValues({ status: status, type: type, title: title, information: information, clearButton: clearButton, actionButton: actionButton}));

};