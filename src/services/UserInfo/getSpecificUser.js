import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { env } from "../../env";
import { handleMessageBar } from "../../utils/handleMessageBar";

const API_PREFIX = env.REACT_APP_API_PREFIX;

export const getSpecificUserAction = createAsyncThunk(
    "getSpecificUserAction",
    async (value, {rejectWithValue}) => {
        
        const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));
        const getUserToken = sessionStorage.getItem("Web-Token");
        
        try {
            const response = await fetch(`${API_PREFIX}/userDetails?username=${getUserStatus?.username}&getId=${value?.GetUserDetails?.getId}`, {
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
                handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server." });
            }

            handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            
            return rejectWithValue(JSON.parse(error?.message));
        }
    }
);

export const getSpecificUserInformationAction = createAsyncThunk(
    "getSpecificUserInformationAction",
    async (value, {rejectWithValue}) => {
        
        const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));
        const getUserToken = sessionStorage.getItem("Web-Token");
        
        try {
            const response = await fetch(`${API_PREFIX}/userDetails?username=${getUserStatus?.username}&getId=${value?.GetUserDetails?.getId}&dataType=${value?.GetUserDetails?.type}`, {
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
                handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server." });
            }

            handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            
            return rejectWithValue(JSON.parse(error?.message));
        }
    }
);

export const getSpecificUserCredentialAction = createAsyncThunk(
    "getSpecificUserCredentialAction",
    async (value, {rejectWithValue}) => {
        
        const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));
        const getUserToken = sessionStorage.getItem("Web-Token");
        
        try {
            const response = await fetch(`${API_PREFIX}/userDetails?username=${getUserStatus?.username}&getId=${value?.GetUserDetails?.getId}&dataType=${value?.GetUserDetails?.type}`, {
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
                handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server." });
            }

            handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            
            return rejectWithValue(JSON.parse(error?.message));
        }
    }
);

export const getSpecificUserSessionAction = createAsyncThunk(
    "getSpecificUserSessionAction",
    async (value, {rejectWithValue}) => {
        
        const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));
        const getUserToken = sessionStorage.getItem("Web-Token");
        
        try {
            const response = await fetch(`${API_PREFIX}/userDetails?username=${getUserStatus?.username}&getId=${value?.GetUserDetails?.getId}&dataType=${value?.GetUserDetails?.type}`, {
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
                handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server." });
            }

            handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            
            return rejectWithValue(JSON.parse(error?.message));
        }
    }
);

export const getSpecificUserServicesAction = createAsyncThunk(
    "getSpecificUserServicesAction",
    async (value, {rejectWithValue}) => {
        
        const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));
        const getUserToken = sessionStorage.getItem("Web-Token");
        
        try {
            const response = await fetch(`${API_PREFIX}/userDetails?username=${getUserStatus?.username}&getId=${value?.GetUserDetails?.getId}&dataType=${value?.GetUserDetails?.type}`, {
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
                handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server." });
            }

            handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            
            return rejectWithValue(JSON.parse(error?.message));
        }
    }
);

export const getSpecificUserSummaryAction = createAsyncThunk(
    "getSpecificUserSummaryAction",
    async (value, {rejectWithValue}) => {
        
        const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));
        const getUserToken = sessionStorage.getItem("Web-Token");
        
        try {
            const response = await fetch(`${API_PREFIX}/userDetails?username=${getUserStatus?.username}&getId=${value?.GetUserDetails?.getId}&dataType=${value?.GetUserDetails?.type}`, {
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
                handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server." });
            }

            handleMessageBar(value?.GetUserDetails?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            
            return rejectWithValue(JSON.parse(error?.message));
        }
    }
);

const initialState = {
    getSpecificUserLoading: null,
    getSpecificUserData: null,
    getSpecificUserError: null,
    getSpecificUserInformationLoading: null,
    getSpecificUserInformationData: null,
    getSpecificUserInformationError: null,
    getSpecificUserCredentialLoading: null,
    getSpecificUserCredentialData: null,
    getSpecificUserCredentialError: null,
    getSpecificUserSessionLoading: null,
    getSpecificUserSessionData: null,
    getSpecificUserSessionError: null,
    getSpecificUserServicesLoading: null,
    getSpecificUserServicesData: null,
    getSpecificUserServicesError: null,
    getSpecificUserSummaryLoading: null,
    getSpecificUserSummaryData: null,
    getSpecificUserSummaryError: null,
};

export const getSpecificUserReducer = createSlice({
    name: "getSpecificUserReducer",
    initialState,
    reducers: {
        getSpecificUserReset: (state) => {
            state.getSpecificUserLoading = initialState?.getSpecificUserLoading;
            state.getSpecificUserData = initialState?.getSpecificUserData;
            state.getSpecificUserError = initialState?.getSpecificUserError;
        },
        getSpecificUserInformationReset: (state) => {
            state.getSpecificUserInformationLoading = initialState?.getSpecificUserInformationLoading;
            state.getSpecificUserInformationData = initialState?.getSpecificUserInformationData;
            state.getSpecificUserInformationError = initialState?.getSpecificUserInformationError;
        },
        getSpecificUserCredentialReset: (state) => {
            state.getSpecificUserCredentialLoading = initialState?.getSpecificUserCredentialLoading;
            state.getSpecificUserCredentialData = initialState?.getSpecificUserCredentialData;
            state.getSpecificUserCredentialError = initialState?.getSpecificUserCredentialError;
        },
        getSpecificUserSessionReset: (state) => {
            state.getSpecificUserSessionLoading = initialState?.getSpecificUserSessionLoading;
            state.getSpecificUserSessionData = initialState?.getSpecificUserSessionData;
            state.getSpecificUserSessionError = initialState?.getSpecificUserSessionError;
        },
        getSpecificUserServicesReset: (state) => {
            state.getSpecificUserServicesLoading = initialState?.getSpecificUserServicesLoading;
            state.getSpecificUserServicesData = initialState?.getSpecificUserServicesData;
            state.getSpecificUserServicesError = initialState?.getSpecificUserServicesError;
        },
        getSpecificUserSummaryReset: (state) => {
            state.getSpecificUserSummaryLoading = initialState?.getSpecificUserSummaryLoading;
            state.getSpecificUserSummaryData = initialState?.getSpecificUserSummaryData;
            state.getSpecificUserSummaryError = initialState?.getSpecificUserSummaryError;
        }
    },
    extraReducers: (reducersResult) => {
        reducersResult.addCase(getSpecificUserAction.pending, (state) => {
            state.getSpecificUserLoading = true;
        });
        reducersResult.addCase(getSpecificUserAction.fulfilled, (state, action) => {
            state.getSpecificUserLoading = false;
            state.getSpecificUserData = action?.payload;
        });
        reducersResult.addCase(getSpecificUserAction.rejected, (state, action) => {
            state.getSpecificUserLoading = false;
            state.getSpecificUserData = false;
            state.getSpecificUserError = action?.payload;
        });
        reducersResult.addCase(getSpecificUserInformationAction.pending, (state) => {
            state.getSpecificUserInformationLoading = true;
        });
        reducersResult.addCase(getSpecificUserInformationAction.fulfilled, (state, action) => {
            state.getSpecificUserInformationLoading = false;
            state.getSpecificUserInformationData = action?.payload;
        });
        reducersResult.addCase(getSpecificUserInformationAction.rejected, (state, action) => {
            state.getSpecificUserInformationLoading = false;
            state.getSpecificUserInformationData = false;
            state.getSpecificUserInformationError = action?.payload;
        });
        reducersResult.addCase(getSpecificUserCredentialAction.pending, (state) => {
            state.getSpecificUserCredentialLoading = true;
        });
        reducersResult.addCase(getSpecificUserCredentialAction.fulfilled, (state, action) => {
            state.getSpecificUserCredentialLoading = false;
            state.getSpecificUserCredentialData = action?.payload;
        });
        reducersResult.addCase(getSpecificUserCredentialAction.rejected, (state, action) => {
            state.getSpecificUserCredentialLoading = false;
            state.getSpecificUserCredentialData = false;
            state.getSpecificUserCredentialError = action?.payload;
        });
        reducersResult.addCase(getSpecificUserSessionAction.pending, (state) => {
            state.getSpecificUserSessionLoading = true;
        });
        reducersResult.addCase(getSpecificUserSessionAction.fulfilled, (state, action) => {
            state.getSpecificUserSessionLoading = false;
            state.getSpecificUserSessionData = action?.payload;
        });
        reducersResult.addCase(getSpecificUserSessionAction.rejected, (state, action) => {
            state.getSpecificUserSessionLoading = false;
            state.getSpecificUserSessionData = false;
            state.getSpecificUserSessionError = action?.payload;
        });
        reducersResult.addCase(getSpecificUserServicesAction.pending, (state) => {
            state.getSpecificUserServicesLoading = true;
        });
        reducersResult.addCase(getSpecificUserServicesAction.fulfilled, (state, action) => {
            state.getSpecificUserServicesLoading = false;
            state.getSpecificUserServicesData = action?.payload;
        });
        reducersResult.addCase(getSpecificUserServicesAction.rejected, (state, action) => {
            state.getSpecificUserServicesLoading = false;
            state.getSpecificUserServicesData = false;
            state.getSpecificUserServicesError = action?.payload;
        });
        reducersResult.addCase(getSpecificUserSummaryAction.pending, (state) => {
            state.getSpecificUserSummaryLoading = true;
        });
        reducersResult.addCase(getSpecificUserSummaryAction.fulfilled, (state, action) => {
            state.getSpecificUserSummaryLoading = false;
            state.getSpecificUserSummaryData = action?.payload;
        });
        reducersResult.addCase(getSpecificUserSummaryAction.rejected, (state, action) => {
            state.getSpecificUserSummaryLoading = false;
            state.getSpecificUserSummaryData = false;
            state.getSpecificUserSummaryError = action?.payload;
        });
    }
})

export const { getSpecificUserReset, getSpecificUserInformationReset, getSpecificUserCredentialReset, getSpecificUserSessionReset, getSpecificUserServicesReset, getSpecificUserSummaryReset } = getSpecificUserReducer.actions;

export default getSpecificUserReducer.reducer;