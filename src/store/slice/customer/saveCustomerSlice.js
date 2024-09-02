import { createSlice } from "@reduxjs/toolkit";
import { postCustomer } from "../../../services/customer/customer";

const initialState = {
    customer: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const saveCustomerSlice = createSlice({
    name: "saveCustomer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postCustomer.pending, (state) => {
                state.customer.isLoading = true;
            })
            .addCase(postCustomer.fulfilled, (state, { payload }) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = true;
                state.customer.data = payload;
            })
            .addCase(postCustomer.rejected, (state, { payload }) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = false;
                state.customer.errorMessage = payload;
            });
    },
});

export default saveCustomerSlice.reducer;