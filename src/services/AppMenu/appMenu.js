import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { env } from "../../env";
import { handleMessageBar } from "../../utils/handleMessageBar";

const API_PREFIX = env.REACT_APP_API_PREFIX;

export const appMenuAction = createAsyncThunk(
    "appMenuAction",
    async (value, {rejectWithValue}) => {

        const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));
        const getUserToken = sessionStorage.getItem("Web-Token");

        try {
            const response = await fetch(`${API_PREFIX}/usermenu?username=${getUserStatus?.username}`, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json", 
                    "webToken": getUserToken
                }
            });
                if (!response.ok) {
                    const errordata = await response.json();
                    throw new Error(JSON.stringify(errordata));
                }
                const data = await response.json();
                return data;
        } catch(error) {
            if (error instanceof TypeError && error?.message === "Failed to fetch") {
                handleMessageBar(value?.appMenu?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server." });
            }

            handleMessageBar(value?.appMenu?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            
            return rejectWithValue(JSON.parse(error?.message));
        }
    }
);

const initialState = {
    appMenuLoading: null,
    appMenuData: null,
    appMenuError: null,
};

export const appMenuReducer = createSlice({
    name: "appMenuReducer",
    initialState,
    reducers: {
        appMenuReset: (state) => {
            state.appMenuLoading = initialState?.appMenuLoading;
            state.appMenuData = initialState?.appMenuData;
            state.appMenuError = initialState?.appMenuError;
        }
    },
    extraReducers: (reducersResult) => {
        reducersResult.addCase(appMenuAction.pending, (state) => {
            state.appMenuLoading = true;
        });
        reducersResult.addCase(appMenuAction.fulfilled, (state, action) => {
            state.appMenuLoading = false;
            state.appMenuData = action?.payload;
        });
        reducersResult.addCase(appMenuAction.rejected, (state, action) => {
            state.appMenuLoading = false;
            state.appMenuData = false;
            state.appMenuError = action?.payload;
        });
    }
});

export const { appMenuReset } = appMenuReducer.actions;

export default appMenuReducer.reducer;