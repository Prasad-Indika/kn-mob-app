import { createSlice } from "@reduxjs/toolkit";
import { getAllPartners } from "../../../services/user/user";

const initialState = {
    partner: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const partnerSlice = createSlice({
    name: "partner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPartners.pending, (state) => {
                state.partner.isLoading = true;
            })
            .addCase(getAllPartners.fulfilled, (state, { payload }) => {
                state.partner.isLoading = false;
                state.partner.isSuccess = true;
                state.partner.data = payload;
            })
            .addCase(getAllPartners.rejected, (state, { payload }) => {
                state.partner.isLoading = false;
                state.partner.isSuccess = false;
                state.partner.errorMessage = payload;
            });
    },
});

export default partnerSlice.reducer;