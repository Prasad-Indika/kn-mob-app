import axios from 'axios'
import { getData } from '../utils/storage/Storage';



const instance = axios.create({
  baseURL: 'http://172.20.10.2:8080',
  //baseURL: 'http://89.116.20.123:8080/api-0.0.1-SNAPSHOT',
  headers: {},
});

instance.interceptors.request.use( async (config)=>{
  try {
    const tokn = await getData("token");
    config.headers.Authorization = `Bearer ${tokn}`;
  } catch (error) {
    console.log("Error retriving token" , error);
  }
  return config;

})

export default instance;