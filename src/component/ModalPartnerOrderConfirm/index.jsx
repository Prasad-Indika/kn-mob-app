import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal,Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
import CommonButton from '../../common/CommonButton/CommonButton';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { launchCamera,launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentRecipt } from '../../services/paymentDetails/paymentDetails';
import { getAllOrders } from '../../services/order/order';

export default function ModalPartnerOrderConfirm({visible,onClose,order,loadData,adminConfirm= false}) {

    const dispatch = useDispatch();
    const [loader,setLoader] = useState(false);
    const [imgUrl,setImgUrl] = useState('');
    const [img,setImage] = useState(null);

    const saveReciptData = useSelector((state) => state.saveReciptSlice.payment)

    // const openCamera = async ()=>{
    //     const res = await launchCamera();
    //     setImgUrl(res?.assets[0]?.uri)
    //     setImage({
    //         uri: res.assets[0].uri,
    //         type: res.assets[0].type,
    //         name: res.assets[0].fileName,
    //       });
    // }

    const openCamera = async () => {
        const res = await launchCamera();
        
        if(res?.assets && res.assets.length > 0){

            ImageResizer.createResizedImage(res?.assets[0]?.uri, 800, 600, 'JPEG', 80)
            .then((response) => {
                setImgUrl(response.uri);
                setImage({
                    uri: response.uri,
                    type: res.assets[0].type,
                    name: res.assets[0].fileName,
                });
            })
            .catch((err) => {
                console.log(err);
            });

        }
    
    }

    const openGalary = async ()=>{
        const res = await launchImageLibrary();
        setImgUrl(res?.assets[0]?.uri)
        setImage({
            uri: res.assets[0].uri,
            type: res.assets[0].type,
            name: res.assets[0].fileName,
          });
    }

    const uploadAndConfirm = ()=>{

        const paymentId = adminConfirm ? order.paymentDetailsGetDto[0].paymentId : order.paymentId
        const ordrId = adminConfirm ? order.orderId  : order.order.orderId

        if(imgUrl){
            const formData = new FormData();
            formData.append('imageDto',img)
    
            setLoader(true);
            dispatch(savePaymentRecipt({paymentId:paymentId,orderId:ordrId,formData:formData}));

        }else{
            Alert.alert('Upload', 'Please Select the Recipt', [
                {
                  text: 'Cancel',
                //   onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ]);
        }
    }

    const removeImage = ()=>{
        setImgUrl('');
        setImage(null);
    }

    useEffect(()=>{
        if(loader){
            if(saveReciptData.isSuccess && !saveReciptData.isLoading){
                dispatch(getAllOrders())
                setLoader(false)
                onClose();
            }else{
                setLoader(false)
            }
        }
    },[saveReciptData.data,saveReciptData.errorMessage])

  return (
    <Portal>
        <Modal visible={visible} onDismiss={onClose} contentContainerStyle={{backgroundColor: 'white',height:"100%"}}>

           <View style={{flex:1, backgroundColor:"#d5f0f5"}}>

            <View style={{height:"12%",padding:12}}>

                <View style={{marginBottom:2}}>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="return-up-back" size={30} color="black"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Confirm & Upload Recipt</Text>
                </View>



            </View>

            <View style={{height:"84%" , backgroundColor: "#ffffff", borderRadius:12, margin:"2%"}}>
                <View style={{justifyContent:'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <View style={styles.imgContainer}>
                        <Image 
                            source={imgUrl ? { uri: imgUrl } : require('../../assets/img/upload.png')}
                            style={styles.img}
                        />
                    </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={()=>{openCamera()}}>
                            <View style={styles.uploadBtn}>
                                <Text style={{fontFamily:'Dosis-SemiBold',color:'#3b3a38'}}>CAM</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=>{openGalary()}}>
                            <View style={styles.uploadBtn}>
                                <Text style={{fontFamily:'Dosis-SemiBold',color:'#3b3a38'}}>GALLARY</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={removeImage}>
                            <View style={styles.uploadBtn}>
                                <Text style={{fontFamily:'Dosis-SemiBold',color:'#3b3a38'}}>REMOVE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{marginHorizontal:45,marginVertical:10}}>
                    < CommonButton
                        style={styles.btn}
                        label={'Upload and Confirm'}
                        onPress={uploadAndConfirm}
                        //disabled={!isValid}
                    />
                </View>
            </View>

           </View>
        </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({

    btn: {
        borderRadius: 8,
        width: "100%",
        height:50,
        fontSize: 18,
        textAlign:'center',
        justifyContent:'center',
        fontFamily:'Dosis-Bold'
    },

    imgContainer:{
        margin:15,
        height:360,
        width:275,
        borderRadius:8

    },
    btnContainer:{
        marginHorizontal:15,
       
        borderColor:'gray',
        borderRadius:8,
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10
    },
    uploadBtn:{
        height: 50,
        width:60,
        borderRadius:6,
        backgroundColor:'#edece8',
        justifyContent:'center',
        alignItems:'center'
    },
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
    img:{
       
        borderRadius:8,
        width:275,
        height:360,
        borderWidth:2
    }
  
});

