import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { env } from "../../env";
import { handleMessageBar } from "../../utils/handleMessageBar";
import { showDialogBoxGlobalStateReset } from "../AlertBox/showDialogBox";
import { userVerificationReset } from "./userVerification";

const API_PREFIX = env.REACT_APP_API_PREFIX;

export const userLogoutAction = createAsyncThunk(
    "createAsyncThunk",
    async(value, {rejectWithValue}) => {
        try {
            const response = await fetch(`${API_PREFIX}/logout`, {
                "method": "PUT",
                "headers": {"Content-Type": "application/json"},
                "body": JSON.stringify({ username: value?.UserDetails?.username, sysDetails: value?.UserDetails?.sysDetails })
            });
            if (!response.ok) {
                const errordata = await response.json();
                value?.UserDetails?.dispatch(showDialogBoxGlobalStateReset());
                throw new Error(JSON.stringify(errordata));
            }
            const data = await response.json();
            if(data?.status){
                value?.UserDetails?.dispatch(showDialogBoxGlobalStateReset());
                value?.UserDetails?.dispatch(userLogoutReset());
                value?.UserDetails?.dispatch(userVerificationReset());
                if(value?.UserDetails?.type === "LogOut"){
                    value?.UserDetails?.navigate('/');
                    sessionStorage.clear();
                }
                handleMessageBar(value?.UserDetails?.dispatch, true, 3000, "success", data?.message, "bottom", "right");
            }
            return data;
        } catch(error) {
            if (error instanceof TypeError && error?.message === "Failed to fetch") {
                handleMessageBar(value?.UserDetails?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server." });
            }
            handleMessageBar(value?.UserDetails?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            return rejectWithValue(JSON.parse(error?.message));
        }
    }
)

const initialState = {
    userLogoutLoading: null,
    userLogoutData: null,
    userLogoutError: null,
};

export const userLogoutReducer = createSlice({
    name: "userLogoutReducer",
    initialState,
    reducers: {
        userLogoutReset: (state) => {
            state.userLogoutLoading = initialState?.userLogoutLoading;
            state.userLogoutData = initialState?.userLogoutData;
            state.userLogoutError = initialState?.userLogoutError;
        }
    },
    extraReducers: (reducersResult) => {
        reducersResult.addCase(userLogoutAction.pending, (state) => {
            state.userLogoutLoading = true;
        });
        reducersResult.addCase(userLogoutAction.fulfilled, (state, action) => {
            state.userLogoutLoading = false;
            state.userLogoutData = action?.payload;
        });
        reducersResult.addCase(userLogoutAction.rejected, (state, action) => {
            state.userLogoutLoading = false;
            state.userLogoutData = false;
            state.userLogoutError = action?.payload;
        });
    }
})

export const { userLogoutReset } = userLogoutReducer.actions;

export default userLogoutReducer.reducer;