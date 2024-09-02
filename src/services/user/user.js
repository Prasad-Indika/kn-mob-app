import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../Axious";

export const getAllPartners = createAsyncThunk('user/getAllPartners',async (_,{rejectWithValue})=>{
    try {
        const {data} = await instance.get('/user/get_all_partner')
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})

export const savePartner = createAsyncThunk('save-partner',async (partner,{rejectWithValue})=>{
    try {
        const {data} = await instance.post('/user/register',partner, {
            headers: {"Content-type": "application/json"},
        })

        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})