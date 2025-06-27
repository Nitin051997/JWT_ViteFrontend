import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { env } from "../../env";
import { handleMessageBar } from "../../utils/handleMessageBar";

const API_PREFIX = env.REACT_APP_API_PREFIX;

export const getAllUserDetailsAction = createAsyncThunk(
    "getAllUserDetailsAction",
    async (value, {rejectWithValue}) => {
        
        const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));
        const getUserToken = sessionStorage.getItem("Web-Token");
        
        try {
            const response = await fetch(`${API_PREFIX}/userlist?username=${getUserStatus?.username}&page=${value?.GetUsersDetails?.page}&search=${value?.GetUsersDetails?.search}`, {
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
                handleMessageBar(value?.GetUsersDetails?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server, Please check your connection." });
            }

            handleMessageBar(value?.GetUsersDetails?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            
            return rejectWithValue(JSON.parse(error?.message));
        }
    }
);

const initialState = {
    getAllUserDetailsLoading: null,
    getAllUserDetailsData: null,
    getAllUserDetailsError: null,
};

export const getAllUserDetailsReducer = createSlice({
    name: "getAllUserDetailsReducer",
    initialState,
    reducers: {
        getAllUserDetailsReset: (state) => {
            state.getAllUserDetailsLoading = initialState?.getAllUserDetailsLoading;
            state.getAllUserDetailsData = initialState?.getAllUserDetailsData;
            state.getAllUserDetailsError = initialState?.getAllUserDetailsError;
        }
    },
    extraReducers: (reducersResult) => {
        reducersResult.addCase(getAllUserDetailsAction.pending, (state) => {
            state.getAllUserDetailsLoading = true;
        });
        reducersResult.addCase(getAllUserDetailsAction.fulfilled, (state, action) => {
            state.getAllUserDetailsLoading = false;
            state.getAllUserDetailsData = action?.payload;
        });
        reducersResult.addCase(getAllUserDetailsAction.rejected, (state, action) => {
            state.getAllUserDetailsLoading = false;
            state.getAllUserDetailsData = false;
            state.getAllUserDetailsError = action?.payload;
        });
    }
})

export const { getAllUserDetailsReset } = getAllUserDetailsReducer.actions;

export default getAllUserDetailsReducer.reducer;