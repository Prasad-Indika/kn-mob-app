import { createSlice } from "@reduxjs/toolkit";
import { updateOrderStatus } from "../../../services/order/order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const updateStatusSlice = createSlice({
    name: "updateOrderStatus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateOrderStatus.pending, (state) => {
                state.order.isLoading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = payload;
            })
            .addCase(updateOrderStatus.rejected, (state, { payload }) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = payload;
            });
    },
});

export default updateStatusSlice.reducer;