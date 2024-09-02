import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "../../../services/auth/auth";

const initialState = {
    auth: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAuth.pending, (state) => {
                state.auth.isLoading = true;
            })
            .addCase(getAuth.fulfilled, (state, { payload }) => {
                state.auth.isLoading = false;
                state.auth.isSuccess = true;
                state.auth.data = payload;
            })
            .addCase(getAuth.rejected, (state, { payload }) => {
                state.auth.isLoading = false;
                state.auth.isSuccess = false;
                state.auth.errorMessage = payload;
            });
    },
});

export default authSlice.reducer;