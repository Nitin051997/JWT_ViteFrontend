import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    previousPage: null,
};

export const navigateBackGlobalState = createSlice({
    name: "navigateBackGlobalState",
    initialState,
    reducers: {
        navigateBackGlobalStateReset: (state) => {
            state.previousPage = initialState?.previousPage;
        },
        navigateBackGlobalStateValues: (state, action) => {
            state.previousPage = action?.payload?.previousPage;
        }
    }
});

export const { navigateBackGlobalStateReset, navigateBackGlobalStateValues } = navigateBackGlobalState.actions;

export default navigateBackGlobalState.reducer;