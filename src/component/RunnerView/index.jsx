import {  Text, TouchableOpacity } from 'react-native'
import { View ,StyleSheet } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import PartnerOrderList from '../PartnerOrdersList';


export default function RunnerView({runner}) {

    const navigation = useNavigation();
    const Tab = createMaterialTopTabNavigator();
  

  return (
    <>
         <View style={{padding:10,backgroundColor:'#d5f0f5'}}>
            <View style={{marginBottom:2}}>
              <TouchableOpacity onPress={()=>{navigation.navigate('RunnerList')}}>
                  <Ionicons name="return-up-back" size={30} color="black"/>
              </TouchableOpacity>
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Runner Name</Text>
            </View>


        </View>

        <Tab.Navigator>
            <Tab.Screen name="Ongoing">
                {props => <PartnerOrderList search={'ongoing'} mode='runner' runnerId={runner.runnerId} />}
            </Tab.Screen>
            <Tab.Screen name="Completed">
                {props => <PartnerOrderList search={'complete'} mode='runner' runnerId={runner.runnerId } />}
            </Tab.Screen>

        </Tab.Navigator>

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
     margin:10
  },
  btn: {
      borderRadius: 7,
      width: 125,
      height:50,
      fontSize: 18,
      textAlign:'center',
      justifyContent:'center'
  },
  buttonContainer: {
      flexDirection:'row',
      justifyContent:'flex-end',
      margin:10
  },
  listSenderName: {
      color: 'white',
      fontSize: 19,
      fontWeight: 'bold',
  },
});
