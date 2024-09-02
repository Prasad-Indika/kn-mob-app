import { createSlice } from "@reduxjs/toolkit";
import { getAllAccounts } from "../../../services/account/account";

const initialState = {
    account: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const accountSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAccounts.pending, (state) => {
                state.account.isLoading = true;
            })
            .addCase(getAllAccounts.fulfilled, (state, { payload }) => {
                state.account.isLoading = false;
                state.account.isSuccess = true;
                state.account.data = payload;
            })
            .addCase(getAllAccounts.rejected, (state, { payload }) => {
                state.account.isLoading = false;
                state.account.isSuccess = false;
                state.account.errorMessage = payload;
            });
    },
});

export default accountSlice.reducer;