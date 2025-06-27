import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appLoader: null,
};

export const appLoaderGlobalState = createSlice({
    name: "appLoaderGlobalState",
    initialState,
    reducers: {
        appLoaderGlobalStateReset: (state) => {
            state.appLoader = initialState?.appLoader;
        },
        appLoaderGlobalStateValues: (state, action) => {
            state.appLoader = action?.payload?.appLoader;
        }
    }
});

export const { appLoaderGlobalStateReset, appLoaderGlobalStateValues } = appLoaderGlobalState.actions;

export default appLoaderGlobalState.reducer;