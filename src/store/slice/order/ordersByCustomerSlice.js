import { createSlice } from "@reduxjs/toolkit";
import { getOrdersByCustomer } from "../../../services/order/order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const ordersByCustomerSlice = createSlice({
    name: "ordersByCustomer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersByCustomer.pending, (state) => {
                state.order.isLoading = true;
            })
            .addCase(getOrdersByCustomer.fulfilled, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = payload;
            })
            .addCase(getOrdersByCustomer.rejected, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = payload;
            });
    },
});

export default ordersByCustomerSlice.reducer;