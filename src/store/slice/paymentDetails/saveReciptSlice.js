import { createSlice } from "@reduxjs/toolkit";
import { savePaymentRecipt } from "../../../services/paymentDetails/paymentDetails";

const initialState = {
    payment: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const saveRecptSlice = createSlice({
    name: "saveRecipt",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(savePaymentRecipt.pending, (state) => {
                state.payment.isLoading = true;
            })
            .addCase(savePaymentRecipt.fulfilled, (state, { payload }) => {
                state.payment.isLoading = false;
                state.payment.isSuccess = true;
                state.payment.data = payload;
            })
            .addCase(savePaymentRecipt.rejected, (state, { payload }) => {
                state.payment.isLoading = false;
                state.payment.isSuccess = false;
                state.payment.errorMessage = payload;
            });
    },
});

export default saveRecptSlice.reducer;