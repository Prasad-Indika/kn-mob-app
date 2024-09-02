import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../../../services/order/order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const saveOrderSlice = createSlice({
    name: "saveOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postOrder.pending, (state) => {
                state.order.isLoading = true;
            })
            .addCase(postOrder.fulfilled, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = payload;
            })
            .addCase(postOrder.rejected, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = payload;
            });
    },
});

export default saveOrderSlice.reducer;