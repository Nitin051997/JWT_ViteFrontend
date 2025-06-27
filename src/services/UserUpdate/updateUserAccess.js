import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { env } from "../../env";
import { handleMessageBar } from "../../utils/handleMessageBar";

const API_PREFIX = env.REACT_APP_API_PREFIX;

export const updateUserAccessAction = createAsyncThunk(
    "createAsyncThunk",
    async(value, {rejectWithValue}) => {

        const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));
        const getUserToken = sessionStorage.getItem("Web-Token");

        try {
            const response = await fetch(`${API_PREFIX}/updateUserAccess`, {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json", 
                    "webToken": getUserToken
                },
                "body": JSON.stringify({ keyUser: getUserStatus?.username, userId: value?.UserDetails?.userId, username: value?.UserDetails?.username, status: value?.UserDetails?.status, sysDetails: value?.UserDetails?.sysDetails })
            });

            if (!response.ok) {
                const errordata = await response.json();
                throw new Error(JSON.stringify(errordata));
            }
            const data = await response.json();
            handleMessageBar(value?.UserDetails?.dispatch, true, 3000, "success", data?.message, "bottom", "right");
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
    updateUserAccessLoading: null,
    updateUserAccessData: null,
    updateUserAccessError: null,
};

export const updateUserAccessReducer = createSlice({
    name: "updateUserAccessReducer",
    initialState,
    reducers: {
        updateUserAccessReset: (state) => {
            state.updateUserAccessLoading = initialState?.updateUserAccessLoading;
            state.updateUserAccessData = initialState?.updateUserAccessData;
            state.updateUserAccessError = initialState?.updateUserAccessError;
        }
    },
    extraReducers: (reducersResult) => {
        reducersResult.addCase(updateUserAccessAction.pending, (state) => {
            state.updateUserAccessLoading = true;
        });
        reducersResult.addCase(updateUserAccessAction.fulfilled, (state, action) => {
            state.updateUserAccessLoading = false;
            state.updateUserAccessData = action?.payload;
        });
        reducersResult.addCase(updateUserAccessAction.rejected, (state, action) => {
            state.updateUserAccessLoading = false;
            state.updateUserAccessData = false;
            state.updateUserAccessError = action?.payload;
        });
    }
})

export const { updateUserAccessReset } = updateUserAccessReducer.actions;

export default updateUserAccessReducer.reducer;