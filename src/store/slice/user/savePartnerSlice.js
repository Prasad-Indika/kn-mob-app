import { createSlice } from "@reduxjs/toolkit";
import { savePartner } from "../../../services/user/user";

const initialState = {
    partner: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
};

export const savePartnreSlice = createSlice({
    name: "savePartner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(savePartner.pending, (state) => {
                state.partner.isLoading = true;
            })
            .addCase(savePartner.fulfilled, (state, { payload }) => {
                state.partner.isLoading = false;
                state.partner.isSuccess = true;
                state.partner.data = payload;
            })
            .addCase(savePartner.rejected, (state, { payload }) => {
                state.partner.isLoading = false;
                state.partner.isSuccess = false;
                state.partner.errorMessage = payload;
            });
    },
});

export default savePartnreSlice.reducer;