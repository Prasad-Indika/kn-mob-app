import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../Axious";

export const getCustomers = createAsyncThunk('customer-getAll',async (_,{rejectWithValue})=>{
    try {
        const {data} = await instance.get('/customer')
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})

export const postCustomer = createAsyncThunk('post-customer',async (customer,{rejectWithValue})=>{
    try {
        const {data} = await instance.post('/customer',customer, {
            headers: {"Content-type": "application/json"},
        })

        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})