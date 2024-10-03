import React, { useEffect, useState } from 'react'
import {FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text} from "react-native-paper"
import Icon1 from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';


const NotificationItem = ({val})=>{

    return(
        <TouchableOpacity onPress={()=>{}}>
            <View style={{marginHorizontal:3,marginTop:3,borderRadius:5,backgroundColor: val.read === 'read' ? "#f7f7f5" : "#e8e8e6",padding:8}}>
                <Text style={{color:'#919190',fontSize:19,fontFamily:'Dosis-SemiBold'}}>{val.notifi}</Text>
                {/* <Text style={{color:'#919190'}}>{""}</Text> */}
                <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:4}}>
                    <View>
                        <Text style={{color:'#919190'}}>{"Ref No 109827"}</Text>
                    </View>
                    <View>
                        <Text style={{color:'#919190'}}>{"20-02-2024"}</Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default function Notifications() {

    const navigation = useNavigation();
    const [notificationsList,setNotificationList] = useState([{read:"read",notifi:"You have assigned a new order"},{read:"not",notifi:"Harsha Vimukthi, has completed a Order"},{read:"not",notifi:""},{read:"read",notifi:""},{read:"not",notifi:""},{read:"not",notifi:""},{read:"read",notifi:""},{read:"not",notifi:""},{read:"not",notifi:""}]);

  return (
    <>

        <View style={{height:"100%" , backgroundColor:"#d5f0f5"}}>
            <View style={{height:"12%",padding:12}}>

                <View style={{marginBottom:2}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Dashboard')}}>
                        <Ionicons name="return-up-back" size={30} color="black"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Notifications</Text>
                </View>
            </View>

            <View style={{height:"87%" , backgroundColor: "#ffffff", borderRadius:5, margin:"1%",paddingBottom:5}}>
                
                {/* <Text style={{fontSize:25,color:'#8a8d91',fontFamily:'Dosis-Regular'}}>No Notifications</Text>
                <Text style={{fontSize:15,color:'#8a8d91',fontFamily:'Dosis-Regular'}}>You do not have notifications yet</Text> */}

                <FlatList
                    data={notificationsList}
                    renderItem={({item})=> <NotificationItem val={item}/>}
                />

            </View>


        </View>



    </>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    title: {
        color: '#1d86f0',
        fontSize: 26,
        textAlign: 'left',
        fontFamily:'Dosis-Bold'
    },
    fieldName: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    fieldContainer: {
       marginHorizontal:15
    },
});
