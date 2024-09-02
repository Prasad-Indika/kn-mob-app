import { createSlice } from "@reduxjs/toolkit";
import { getOrdersByReciever } from "../../../services/order/order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const ordersByReceiverSlice = createSlice({
    name: "ordersByReciver",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersByReciever.pending, (state) => {
                state.order.isLoading = true;
            })
            .addCase(getOrdersByReciever.fulfilled, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = payload;
            })
            .addCase(getOrdersByReciever.rejected, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = payload;
            });
    },
});

export default ordersByReceiverSlice.reducer;