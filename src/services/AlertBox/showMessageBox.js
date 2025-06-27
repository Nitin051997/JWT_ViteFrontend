import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    statusMessageBox: false,
    duration: 0,
    typeMessageBox: null,
    message: null,
    position: null,
    side: null,
}

export const showMessageBoxGlobalState = createSlice({
    name: "showMessageBoxGlobalState",
    initialState,
    reducers: {
        showMessageBoxGlobalStateReset: (state) => {
            state.statusMessageBox = initialState?.statusMessageBox;
            state.duration = initialState?.duration;
            state.typeMessageBox = initialState?.typeMessageBox;
            state.message = initialState?.message;
            state.position = initialState?.position;
            state.side = initialState?.side;
        },
        showMessageBoxGlobalStateValues: (state, action) => {
            state.statusMessageBox = action?.payload?.status;
            state.duration = action?.payload?.duration;
            state.typeMessageBox = action?.payload?.type;
            state.message = action?.payload?.message;
            state.position = action?.payload?.position;
            state.side = action?.payload?.side;
        },
    }
})

export const { showMessageBoxGlobalStateReset, showMessageBoxGlobalStateValues } = showMessageBoxGlobalState.actions;

export default showMessageBoxGlobalState.reducer;