import { configureStore } from "@reduxjs/toolkit";
import transformer from "./transformer";

export const store = configureStore({
    reducer: transformer,
});

export default store;