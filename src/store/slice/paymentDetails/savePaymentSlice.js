import { createSlice } from "@reduxjs/toolkit";
import { postPaymetDetails } from "../../../services/paymentDetails/paymentDetails";

const initialState = {
    payment: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const savePaymentSlice = createSlice({
    name: "savePayment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postPaymetDetails.pending, (state) => {
                state.payment.isLoading = true;
            })
            .addCase(postPaymetDetails.fulfilled, (state, { payload }) => {
                state.payment.isLoading = false;
                state.payment.isSuccess = true;
                state.payment.data = payload;
            })
            .addCase(postPaymetDetails.rejected, (state, { payload }) => {
                state.payment.isLoading = false;
                state.payment.isSuccess = false;
                state.payment.errorMessage = payload;
            });
    },
});

export default savePaymentSlice.reducer;