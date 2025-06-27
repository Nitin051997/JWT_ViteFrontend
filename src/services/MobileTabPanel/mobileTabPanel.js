import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mobileTabPanelState: null,
};

export const mobileTabPanelGlobalState = createSlice({
    name: "mobileTabPanelGlobalState",
    initialState,
    reducers: {
        mobileTabPanelGlobalStateReset: (state) => {
            state.mobileTabPanelState = initialState?.mobileTabPanelState;
        },
        mobileTabPanelGlobalStateValues: (state, action) => {
            state.mobileTabPanelState = action?.payload?.mobileTabPanelState;
        }
    }
});

export const { mobileTabPanelGlobalStateReset, mobileTabPanelGlobalStateValues } = mobileTabPanelGlobalState.actions;

export default mobileTabPanelGlobalState.reducer;