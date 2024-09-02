import { createSlice } from "@reduxjs/toolkit";
import { postAccount } from "../../../services/account/account";

const initialState = {
    account: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const saveAccountSlice = createSlice({
    name: "saveAccount",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postAccount.pending, (state) => {
                state.account.isLoading = true;
            })
            .addCase(postAccount.fulfilled, (state, { payload }) => {
                state.account.isLoading = false;
                state.account.isSuccess = true;
                state.account.data = payload;
            })
            .addCase(postAccount.rejected, (state, { payload }) => {
                state.account.isLoading = false;
                state.account.isSuccess = false;
                state.account.errorMessage = payload;
            });
    },
});

export default saveAccountSlice.reducer;