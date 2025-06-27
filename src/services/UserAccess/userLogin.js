import CryptoJS from "crypto-js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { env } from "../../env";
import { handleMessageBar } from "../../utils/handleMessageBar";

const API_PREFIX = env.REACT_APP_API_PREFIX;

export const userLoginAction = createAsyncThunk(
    "userLoginAction",
    async (value, {rejectWithValue}) => {
        try {
            const secretKey = "your-32-char-secret-key"; // Store this securely, never expose it in frontend
            const encryptedPassword = CryptoJS.AES.encrypt(value?.LoginDetails?.password, secretKey).toString();
            const response = await fetch(`${API_PREFIX}/login`, {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({username: value?.LoginDetails?.username, password: encryptedPassword, sysDetails: value?.LoginDetails?.sysDetails })
        });
            if (!response.ok) {
                const errordata = await response.json();
                throw new Error(JSON.stringify(errordata));
            }
            const data = await response.json();
            let userStatus = { username: value?.LoginDetails?.username, status: true }
            let token = data?.webToken;
            sessionStorage.setItem("Web-Token", token);
            sessionStorage.setItem("Web-Login-Status", JSON.stringify(userStatus));
            if(value?.LoginDetails?.type === "LogIn"){
                value?.LoginDetails?.navigate('/home');
            }
            handleMessageBar(value?.LoginDetails?.dispatch, true, 3000, "success", "Successfully Login", "bottom", "right");
            return data;
        } catch(error) {
            if (error instanceof TypeError && error?.message === "Failed to fetch") {
                handleMessageBar(value?.LoginDetails?.dispatch, true, 3000, "error", "Network error: Please check your connection.", "bottom", "right");
                return rejectWithValue({ message: "Network error: Unable to connect to the server." });
            }
            handleMessageBar(value?.LoginDetails?.dispatch, true, 3000, "error", rejectWithValue(JSON.parse(error?.message))?.payload?.message, "bottom", "right");
            return rejectWithValue(JSON.parse(error?.message));
        }
    }
);

const initialState = {
    userLoginLoading: null,
    userLoginData: null,
    userLoginError: null,
};

export const userLoginReducer = createSlice({
    name: "userLoginReducer",
    initialState,
    reducers: {
        userLoginReset: (state) => {
            state.userLoginLoading = initialState?.userLoginLoading;
            state.userLoginData = initialState?.userLoginData;
            state.userLoginError = initialState?.userLoginError;
        }
    },
    extraReducers: (reducersResult) => {
        reducersResult.addCase(userLoginAction.pending, (state) => {
            state.userLoginLoading = true;
        });
        reducersResult.addCase(userLoginAction.fulfilled, (state, action) => {
            state.userLoginLoading = false;
            state.userLoginData = action?.payload;
        });
        reducersResult.addCase(userLoginAction.rejected, (state, action) => {
            state.userLoginLoading = false;
            state.userLoginData = false;
            state.userLoginError = action?.payload;
        });
    }
})

export const { userLoginReset } = userLoginReducer.actions;

export default userLoginReducer.reducer;