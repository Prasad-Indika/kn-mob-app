import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../Axious";

export const getAllOrders = createAsyncThunk('orders/getAll',async (_,{rejectWithValue})=>{
    try {
        const {data} = await instance.get('/order')
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})

export const postOrder = createAsyncThunk('post-order',async (order,{rejectWithValue})=>{
    try {
        const {data} = await instance.post('/order',order, {
            headers: {"Content-type": "application/json"},
        })

        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})

export const updateOrderStatus = createAsyncThunk('update-status', async ({id,updateData}, { rejectWithValue  }) => {
    try {
        const { data } = await instance.put(`/order/updateState/${id}`,  updateData,{
            headers: { "Content-type": "application/json" },
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getOrdersByCustomer = createAsyncThunk('orders/byCustomer',async (id,{rejectWithValue})=>{
    try {
        const {data} = await instance.get(`/order/get_order_customer_wise/${id}`)
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})

export const getOrdersByReciever = createAsyncThunk('orders/byReciver',async (id,{rejectWithValue})=>{
    try {
        const {data} = await instance.get(`/order/get_order_receiver_wise/${id}`)
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})

export const getOrdersById = createAsyncThunk('orders/byId',async (id,{rejectWithValue})=>{
    try {
        const {data} = await instance.get(`/order/${id}`)
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})





// export const postCustomer = createAsyncThunk('post-customer',async (customer,{rejectWithValue})=>{
//     try {
//         const {data} = await instance.post('/customer',customer, {
//             headers: {"Content-type": "application/json"},
//         })

//         return data;
//     } catch (error) {
//         return rejectWithValue(error?.response?.data);
//     }
// })