import { createSlice } from "@reduxjs/toolkit";
import { getOrdersById } from "../../../services/order/order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const orderByIdSlice = createSlice({
    name: "orderById",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersById.pending, (state) => {
                state.order.isLoading = true;
            })
            .addCase(getOrdersById.fulfilled, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = payload;
            })
            .addCase(getOrdersById.rejected, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = payload;
            });
    },
});

export default orderByIdSlice.reducer;