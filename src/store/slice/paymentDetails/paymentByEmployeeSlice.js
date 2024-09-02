import { createSlice } from "@reduxjs/toolkit";
import { getPaymentDetailsByEmployee } from "../../../services/paymentDetails/paymentDetails";

const initialState = {
    payment: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const paymentsByEmployeeSlice = createSlice({
    name: "paymentByEmployee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentDetailsByEmployee.pending, (state) => {
                state.payment.isLoading = true;
            })
            .addCase(getPaymentDetailsByEmployee.fulfilled, (state, { payload }) => {
                state.payment.isLoading = false;
                state.payment.isSuccess = true;
                state.payment.data = payload;
            })
            .addCase(getPaymentDetailsByEmployee.rejected, (state, { payload }) => {
                state.payment.isLoading = false;
                state.payment.isSuccess = false;
                state.payment.errorMessage = payload;
            });
    },
});

export default paymentsByEmployeeSlice.reducer;