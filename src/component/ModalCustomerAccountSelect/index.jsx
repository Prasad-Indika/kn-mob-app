import React, { useState,useEffect } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import TextField from '../../common/TextField/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../../services/account/account';


export default function ModalCustomerAccountSelect({visible = false , onClose,onItemClick}) {

    const dispatch = useDispatch();
    const [accountList , setAccountList] = useState([]);
    
    const accountData = useSelector((state)=>state.accountSlice.account)

    function searchAccounts(orders, searchString) {
        function searchInObject(obj, searchString) {
          for (let key in obj) {
            if (typeof obj[key] === 'object') {
              if (searchInObject(obj[key], searchString)) {
                return true;
              }
            } else {
              if (String(obj[key]).toLowerCase().includes(searchString.toLowerCase())) {
                return true;
              }
            }
          }
          return false;
        }
      
        return orders.filter(order => searchInObject(order, searchString));
      }

    useEffect(()=>{
           dispatch(getAllAccounts());
      },[]);


    useEffect(()=>{
        if(accountData.isSuccess){
            setAccountList(accountData.data)
        }  
    },[accountData.data,accountData.isSuccess])


    const AccountItem = ({val})=>{

        return(
            <TouchableOpacity onPress={()=>{onItemClick(val)}}>
                <View style={{marginHorizontal:8,marginTop:10,backgroundColor:'#f0eee9',padding:8,borderRadius:7}}>
            <Text style={styles.listSenderName}>{val.customer.firstName}</Text>
            <Text style={styles.listSenderName}>{val.name}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <Text style={styles.listSenderName}>{val.bank}</Text>
                </View>
                <View>
                    <Text style={styles.listSenderName}>{val.accountNo}</Text>
                </View>

            </View>
        </View>
            </TouchableOpacity>
        )
    }

  
  return (
    <Portal>
        <Modal visible={visible} onDismiss={onClose} contentContainerStyle={{backgroundColor: 'white', padding: 20,height:"100%"}}>
            <View style={{flex:1}}>
                    <View style={{marginHorizontal:8}}>
                        <TextField
                            label={'Search Reciever'}
                            onChange={(val)=>{
                                const matchedOrders = searchAccounts(accountData?.data, val);
                                setAccountList(matchedOrders);
                            }}
                        />
                    </View>

               
                     <FlatList
                        data={accountList}
                        renderItem={({item})=> <AccountItem val={item}/>}
                    />
            </View> 
        </Modal>
    </Portal>
  )
}


const styles = StyleSheet.create({
    title: {
      color: '#1d86f0',
      fontSize: 26,
      textAlign: 'left',
      fontFamily:'Dosis-Bold'
    },
    listSenderName: {
        color:'#919190'
     },
});
