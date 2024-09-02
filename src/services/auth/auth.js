import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../Axious";
import { getData } from "../../utils/storage/Storage";

export const getAuth = createAsyncThunk('auth/details',async (_,{rejectWithValue})=>{
    try {
        const role = await getData('role')
        const {data} = await instance.post('/user/get_user_info_by_token',{role:role})
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})