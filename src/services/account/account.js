import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../Axious";

export const postAccount = createAsyncThunk('save-account',async (account,{rejectWithValue})=>{
    try {
        const {data} = await instance.post('/account',account, {
            headers: {"Content-type": "application/json"},
        })

        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})

export const getAllAccounts = createAsyncThunk('account/getAll',async (_,{rejectWithValue})=>{
    try {
        const {data} = await instance.get(`/account`)
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})