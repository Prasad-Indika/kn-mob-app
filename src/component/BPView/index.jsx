import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native';
import PaymentDetailsListofPartner from '../PaymerntDetailsListofPartner';
import OrderItemViewModal from '../OrderItemViewModal/OrderItemViewModal';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersById } from '../../services/order/order';

export default function BPView({partner}) {

    const navigation = useNavigation();
    const Tab = createMaterialTopTabNavigator();

    const dispatch = useDispatch();
    const [loader,setLoader] = useState(false)
    const [visible,setVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});

    const orderData = useSelector((state)=>state.orderByIdSlice.order)

    const getOrder = (orderId)=>{
        setLoader(true)
        dispatch(getOrdersById(orderId))
    }

    useEffect(()=>{
        if(orderData.isSuccess && loader){
            setSelectedOrder(orderData.data);
            setVisible(true);
            setLoader(false)
        }  
    },[orderData.data,orderData.isSuccess])


  return (
    <>
        <View style={{margin:10,marginBottom:30,display:'flex',flexDirection:'row'}}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity>
                    <Icon name="person" size={40} color="black"/> 
                </TouchableOpacity>
            </View>
            <View style={{flex:6}}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:20,color:'black'}}>{partner.fistName}</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate('BPList')}}>
                        <Icon name="x" size={26} color="black"/> 
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize:12,color:'black'}}>{partner?.contact}</Text>
                <Text style={{fontSize:12,color:'black'}}>{partner?.country}</Text>
            </View>
        </View>
       <Tab.Navigator>
            <Tab.Screen name='Ongoing' >
                {props => <PaymentDetailsListofPartner search='ongoing' partnerId={partner.employeeId} onViewClick={(orderId)=>{
                    getOrder(orderId)
                }}/>}
            </Tab.Screen>
            <Tab.Screen name='Completed' >
                {props => <PaymentDetailsListofPartner search='complete' partnerId={partner.employeeId} onViewClick={(orderId)=>{
                    getOrder(orderId)
                }} />}
            </Tab.Screen>
        </Tab.Navigator>
        {visible &&
            <OrderItemViewModal order={selectedOrder} visible={visible} onClose={()=>{setVisible(false)}}/> 
        }
    </>
  )
}
