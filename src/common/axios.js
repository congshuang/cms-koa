import axios from "axios";
import router from "../router/index"
import {MessageBox, Loading} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from "../store"
import qs from 'qs';
import { setStore, getStore, removeStore } from '../common/store';
axios.defaults.baseURL = 'http://localhost:3000/'; // 全局的地址
// axios.defaults.headers.common['Authorization'] = 'Bearer '+ getStore({ name: 'token' });
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
NProgress.configure({  easing: 'ease',showSpinner: false, parent:'#wrapper'});

let resCount = 0;
let mesList = new Set();
let mesHtml = "";

const service = axios.create({
  // 设置axios 请求过期时间
  timeout: 50000,
  // 设置axios 请求前置路径
  // baseURL: CONTEXT,
  // 设置axios 允许跨域请求
  withCredentials: true
})
const openBox = (message,is) =>{
  if(!is){mesList.add(message);}
  if(resCount == 0){
    setTimeout(() =>{
      if(resCount == 0){

        if(!is){
          [...mesList].forEach((value,index) =>{
            mesHtml += `<p><strong>${index+1}. <i>${value}</i></strong></p>`;
          })
          let isIn = mesHtml.includes('没有权限请重新登陆');
          if(isIn){
            MessageBox.confirm(mesHtml,'提示',{
              type:'info',
              dangerouslyUseHTMLString:true,
              showClose:false,
              cancelButtonText: '放弃前往',
              confirmButtonText:'前往',
              closeOnClickModal:false
            }).then(() =>{
              router.push('/a/login');
            }).catch(() =>{});
          }else{
            MessageBox.alert(mesHtml,'提示',{
              type:'info',
              dangerouslyUseHTMLString:true,
              showClose:false,
              confirmButtonText:'确定',
            })
          }

          mesHtml = "";
          mesList.clear();
        }
        NProgress.done();
      }
    },100)
  }
};
// 设置axios 请求拦截
service.interceptors.request.use(
  config => {
    if (config.method === 'post'){
      config.data = qs.stringify(config.data)
    }
    config.headers.Authorization = 'Bearer '+ store.getters.token;
    if(resCount == 0){NProgress.start();}
    resCount++;
    return config
  },
  error => {
    resCount++;
    return Promise.reject(error);
  }
)
//返回状态判断
service.interceptors.response.use(
  response => {
    if(resCount != 0){
      resCount--;
      openBox('',true);
    }

    return response;
  },
  error => {

    if(resCount != 0){
      resCount--;
    }
    //关闭loading
    if (error.response) {
      switch (error.response.status) {

        case 401:

          break;
        case 404:

          break;
        case 302:
          let url = error.response.config.url;
          if(url.includes('/logout')||url.includes('/login')){
            NProgress.done();
          }else{
            openBox('没有权限请重新登陆',false);
          }
          break;
        default:
          openBox('网络出现问题',false);
          break;
      }
    } else {

    }

    return Promise.reject(error)
  });


export default service
