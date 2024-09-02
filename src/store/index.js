import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth/authSlice";
import orderSlice from "./slice/order/orderSlice";
import partnersSlice from "./slice/user/partnersSlice";
import savePaymentSlice from "./slice/paymentDetails/savePaymentSlice";
import updateStatusSlice from "./slice/order/updateStatusSlice";
import saveReciptSlice from "./slice/paymentDetails/saveReciptSlice";
import saveCustomerSlice from "./slice/customer/saveCustomerSlice";
import customerSlice from "./slice/customer/customerSlice";
import saveAccountSlice from "./slice/account/saveAccountSlice";
import ordersByCustomerSlice from "./slice/order/ordersByCustomerSlice";
import ordersByReciverSlice from "./slice/order/ordersByReciverSlice";
import savePartnerSlice from "./slice/user/savePartnerSlice";
import orderByIdSlice from "./slice/order/orderByIdSlice";
import paymentByEmployeeSlice from "./slice/paymentDetails/paymentByEmployeeSlice";
import saveOrderSlice from "./slice/order/saveOrderSlice";
import accountSlice from "./slice/account/accountSlice";


export const store = configureStore({
    reducer:{
        authSlice,
        orderSlice,
        partnersSlice,
        savePaymentSlice,
        updateStatusSlice,
        saveReciptSlice,
        saveCustomerSlice,
        customerSlice,
        saveAccountSlice,
        ordersByCustomerSlice,
        ordersByReciverSlice,
        savePartnerSlice,
        orderByIdSlice,
        paymentByEmployeeSlice,
        saveOrderSlice,
        accountSlice
    }
})