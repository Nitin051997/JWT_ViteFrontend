import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { env } from "../../env";
import { handleMessageBar } from "../../utils/handleMessageBar";
import { handleAppLogout } from "../../utils/handleAppLogout";

const API_PREFIX = env.REACT_APP_API_PREFIX;

export const userVerificationAction = createAsyncThunk(
    "userVerificationAction",
    async (value, {rejectWithValue}) => {

        const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));
        const getUserToken = sessionStorage.getItem("Web-Token");
        
        try {
            const response = await fetch(`${API_PREFIX}/verifyuser?username=${getUserStatus?.username}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json", 
                "webToken": getUserToken,
            } 
        });
            if (!response.ok) {
                const errordata = await response.json();
                throw new Error(JSON.stringify(errordata));
            }
            const data = await response.json();
            handleMessageBar(value?.UserVerifyDetails?.dispatch, true, 3000, "success", data?.message, "bottom", "right");
            return data;
        } catch(error) {
            if (error instanceof TypeError && error?.message === "Failed to fetch") {
                handleMessageBar(value?.UserVerifyDetails?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server." });
            }

            handleMessageBar(value?.UserVerifyDetails?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            handleAppLogout(value?.UserVerifyDetails?.dispatch, getUserStatus?.username, value?.UserVerifyDetails?.navigate, "LogOut");

            return rejectWithValue(JSON.parse(error?.message));
        }
    }
);

const initialState = {
    userVerificationLoading: null,
    userVerificationData: null,
    userVerificationError: null,
};

export const userVerificationReducer = createSlice({
    name: "userVerificationReducer",
    initialState,
    reducers: {
        userVerificationReset: (state) => {
            state.userVerificationLoading = initialState?.userVerificationLoading;
            state.userVerificationData = initialState?.userVerificationData;
            state.userVerificationError = initialState?.userVerificationError;
        }
    },
    extraReducers: (reducersResult) => {
        reducersResult.addCase(userVerificationAction.pending, (state) => {
            state.userVerificationLoading = true;
        });
        reducersResult.addCase(userVerificationAction.fulfilled, (state, action) => {
            state.userVerificationLoading = false;
            state.userVerificationData = action?.payload;
        });
        reducersResult.addCase(userVerificationAction.rejected, (state, action) => {
            state.userVerificationLoading = false;
            state.userVerificationData = false;
            state.userVerificationError = action?.payload;
        });
    }
})

export const { userVerificationReset } = userVerificationReducer.actions;

export default userVerificationReducer.reducer;