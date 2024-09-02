import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../Axious";

export const postPaymetDetails = createAsyncThunk('savePayment',async (payment,{rejectWithValue})=>{
    try {
        const {data} = await instance.post('/payment_details',payment, {
            headers: {"Content-type": "application/json"},
        })

        await instance.put(`/order/updateState/${payment.orderId}`,  {status:'assign'},{
            headers: { "Content-type": "application/json" },
        });

        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})

export const savePaymentRecipt = createAsyncThunk('recipt-save', async ({paymentId,orderId,formData}, {rejectWithValue}) => {
    try {
        const {data} = await instance.put(`payment_details/image_save/${paymentId}`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })

        await instance.put(`/order/updateState/${orderId}`,  {status:'complete'},{
            headers: { "Content-type": "application/json" },
        });


        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getPaymentDetailsByEmployee = createAsyncThunk('payment/byEmployee',async (id,{rejectWithValue})=>{
    try {
        const {data} = await instance.get(`/payment_details/employee_wise/ ${id}`)
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})

