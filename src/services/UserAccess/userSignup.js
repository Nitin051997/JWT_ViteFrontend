import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { env } from "../../env";
import { handleMessageBar } from "../../utils/handleMessageBar";

const API_PREFIX = env.REACT_APP_API_PREFIX;

export const userSignupAction = createAsyncThunk(
    "userSignupAction",
    async(value, {rejectWithValue}) => {
        try {
            const response = await fetch(`${API_PREFIX}/signup`, {
                "method": "POST",
                "headers": {"Content-Type": "application/json"},
                "body": JSON.stringify(value?.CreateUserDetails)
            });
            if (!response.ok) {
                const errordata = await response.json();
                throw new Error(JSON.stringify(errordata));
            }
            const data = await response.json();
            handleMessageBar(value?.CreateUserDetails?.dispatch, true, 3000, "success", data?.message, "bottom", "right");
            value?.CreateUserDetails?.navigate('/');
            return data;
        } catch(error) {
            if (error instanceof TypeError && error?.message === "Failed to fetch") {
                handleMessageBar(value?.CreateUserDetails?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server." });
            }
            handleMessageBar(value?.CreateUserDetails?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            return rejectWithValue(JSON.parse(error?.message));
        }
    }
);

const initialState = {
    userSignupLoading: null,
    userSignupData: null,
    userSignupError: null,
};

export const userSignupReducer = createSlice({
    name: "userSignupReducer",
    initialState,
    reducers: {
        userSignupReset: (state) => {
            state.userSignupLoading = initialState?.userSignupLoading;
            state.userSignupData = initialState?.userSignupData;
            state.userSignupError = initialState?.userSignupError;
        }
    },
    extraReducers: (reducersResult) => {
        reducersResult.addCase(userSignupAction.pending, (state) => {
            state.userSignupLoading = true;
        });
        reducersResult.addCase(userSignupAction.fulfilled, (state, action) => {
            state.userSignupLoading = false;
            state.userSignupData = action?.payload;
        });
        reducersResult.addCase(userSignupAction.rejected, (state, action) => {
            state.userSignupLoading = false;
            state.userSignupData = false;
            state.userSignupError = action?.payload;
        });
    }
})

export const { userSignupReset } = userSignupReducer.actions;

export default userSignupReducer.reducer;