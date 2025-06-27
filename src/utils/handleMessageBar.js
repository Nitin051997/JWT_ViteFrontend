import { showMessageBoxGlobalStateValues } from "../services/AlertBox/showMessageBox";

export const handleMessageBar = (dispatch, status, duration, type, message, position, side) => {

    dispatch(showMessageBoxGlobalStateValues({ status: status, duration: duration, type: type, message: message, position: position, side: side }));

};