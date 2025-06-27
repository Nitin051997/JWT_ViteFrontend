import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    statusDialogBox: false,
    typeDialogBox: null,
    title: null,
    information: null,
    clearButton: null,
    actionButton: null,
}

export const showDialogBoxGlobalState = createSlice({
    name: "showDialogBoxGlobalState",
    initialState,
    reducers: {
        showDialogBoxGlobalStateReset: (state) => {
            state.statusDialogBox = initialState?.statusDialogBox;
            state.typeDialogBox = initialState?.typeDialogBox;
            state.title = initialState?.title;
            state.information = initialState?.information;
            state.clearButton = initialState?.clearButton;
            state.actionButton = initialState?.actionButton;
        },
        showDialogBoxGlobalStateValues: (state, action) => {
            state.statusDialogBox = action?.payload?.status;
            state.typeDialogBox = action?.payload?.type;
            state.title = action?.payload?.title;
            state.information = action?.payload?.information;
            state.clearButton = action?.payload?.clearButton;
            state.actionButton = action?.payload?.actionButton;
        } 
    }
});

export const { showDialogBoxGlobalStateReset, showDialogBoxGlobalStateValues } = showDialogBoxGlobalState.actions;

export default showDialogBoxGlobalState.reducer;