import { createSlice } from "@reduxjs/toolkit";
import { getCustomers } from "../../../services/customer/customer";

const initialState = {
    customer: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCustomers.pending, (state) => {
                state.customer.isLoading = true;
            })
            .addCase(getCustomers.fulfilled, (state, { payload }) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = true;
                state.customer.data = payload;
            })
            .addCase(getCustomers.rejected, (state, { payload }) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = false;
                state.customer.errorMessage = payload;
            });
    },
});

export default customerSlice.reducer;