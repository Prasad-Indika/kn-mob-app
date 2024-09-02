import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "../../../services/order/order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.order.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = payload;
            })
            .addCase(getAllOrders.rejected, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = payload;
            });
    },
});

export default orderSlice.reducer;