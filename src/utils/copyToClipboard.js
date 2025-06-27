import { handleMessageBar } from "./handleMessageBar";

export const copyToClipboard = (dispatch, data) => {
    if (data?.copyData) {
        if(navigator?.clipboard?.writeText !== undefined){
            navigator.clipboard.writeText(data?.copyData).then(() => {
                handleMessageBar(dispatch, true, 3000, "success", "Token copied to clipboard!", "bottom", "right");
            }).catch(() => {
                handleMessageBar(dispatch, true, 3000, "error", "Failed to copy:", "bottom", "right");
            });
        } else {
            handleMessageBar(dispatch, true, 3000, "warning", "Clipboard API is not available in this environment.", "bottom", "right");
        }
    }
};