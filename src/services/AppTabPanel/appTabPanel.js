import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appTabPanelState: null,
};

export const appTabPanelGlobalState = createSlice({
    name: "appTabPanelGlobalState",
    initialState,
    reducers: {
        appTabPanelGlobalStateReset: (state) => {
            state.appTabPanelState = initialState?.appTabPanelState;
        },
        appTabPanelGlobalStateValues: (state, action) => {
            state.appTabPanelState = action?.payload?.appTabPanelState;
        }
    }
});

export const { appTabPanelGlobalStateReset, appTabPanelGlobalStateValues } = appTabPanelGlobalState.actions;

export default appTabPanelGlobalState.reducer;