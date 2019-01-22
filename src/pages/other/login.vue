<template lang="html">
  <div class="login-container pull-height" id="wrapper">
    <div class="login-wrapper">
      <div class="login-left animated bounceInLeft">
        <div class="animated" :class="{'shake':!pass,'bounceOutLeft':pass}">
          <p style="font-size: 16px">PIM 产品信息管理系统</p>
          <p>1.产品基本信息管理审批驳回数据加快数据的更新</p>
          <p>2.产品基本信息管理审批驳回数据加快数据的更新驳回数据加快数据的更新驳回数据加快数据的更新</p>
          <p>3.产品基本信息管理审批驳回数据加快数据的更新驳回数据加快数据的更新</p>
          <p>4.产品基本信息管理审加快数据的更新</p>
        </div>
      </div>
      <div class="login-right animated bounceInRight">
        <div class="animated" :class="{'shake':!pass,'bounceOutRight':pass}">
          <el-form label-position="left" label-width="80px"  :model="form" :rules="rules" ref="form" id="login_form">
            <el-form-item label="账号" prop="username">
              <i></i>
              <el-input v-model="form.username" size="small" @keyup.enter.native="login">
                <i slot="prefix" class="fa fa-user" style="color: #fff"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" size="small" @keyup.enter.native="login" :type="type" autocomplete="off">
                <i slot="prefix" class="icon iconfont icon-suo" style="color: #fff"></i>
                <i slot="suffix" class="icon iconfont icon-closeeye" v-if="iseye" @click="changeType"></i>
                <i slot="suffix" class="icon iconfont icon-open_eye" v-else @click="changeType"></i>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="login_btn">
            <el-button size="small" @click.native.prevent="login" style="background-color: transparent;color: #fff;">登 陆</el-button>
            <el-button size="small" @click.native.prevent="reset" style="background-color: transparent;color: #fff;">重 置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import * as api from "../../api"
  import * as sysApi from '../../services/sys'
  import types from '../../store/mutation-types'
  import { setStore, getStore, removeStore } from '../../common/store';
  export default {
    name: 'login',
    data() {
      return {
        type:'password',
        iseye:true,
        form: {
          username: '',
          password: ''
        },
        pass:false,
        rules: {
          username: [{ required: true, message: '请输入账户', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        }
      }
    },
    components: {},
    methods: {
      ...mapMutations({
        setUserInfo: types.SET_USER_INFO,
        loadMenu: types.LOAD_MENU,
        setBtnMenu: types.SET_BTN_MENU,
        setToken: types.SET_TOKEN,
      }),
      loadData() {

      },
      login(){
        this.$http.post(api.SYS_LOGIN,this.form).then((res) =>{
          if(res.data.code == 200){
            this.setToken(res.data.token);
            setStore({name:'token',content:res.data.token,type:'token'});
            this.$http.get(api.SYS_MENULIST).then((menus) =>{
              let list = menus.data.data;
              this.setUserInfo(res.data.data);
              this.loadMenu(list);
              this.setBtnMenu(res.data.data.btnMenu);
              setStore({name:'menuList',content:list});
              setStore({name:'btnMenu',content:res.data.data.btnMenu});
              setStore({name:'userInfo',content:res.data.data});
              this.$router.push({path:'/test'});
            });

          }else{
            this.$message({
              type:'info',
              message:'输入密码账号有误...'
            });
          }

        });


      },
      reset(){
        this.$refs['form'].resetFields();
      },
      changeType(){
        this.iseye = !this.iseye;
        if(this.iseye){
          this.type = 'password';
        }else{
          this.type = 'text';
        }
      }
    },
    mounted(){
      $('.login-right .el-form-item__label').css({'color':'#fff'});
      $('.login-right .el-form input').css({'background': 'transparent', 'color': '#fff'});
    }
  }
</script>

<style scoped>
  @import "../../assets/css/index.scss";
  .login-container {
    background-image: url("../../assets/img/login.png");
    background-size: cover;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .login-wrapper{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .login-left{
    width: 30%;
    margin-left: 40px;
    background-color: transparent;
    box-shadow: 8px 17px 30px hsla(0, 0%, 7%, .5);
    padding: 20px;
  }
  .login-right{
    width: 400px;
    margin-right: 40px;
    background-color: transparent;
    box-shadow: 8px 17px 30px hsla(0, 0%, 7%, 1);
    border-radius: 10px;
    padding: 20px 20px 20px 30px;
  }
  .login-left P{
    font-size: 14px;
    margin: 5px 0px;
    color: #fff;
  }
  .login_btn{
    display: flex;
    margin-top: 10px;
    justify-content: space-around;
    align-items: center;
  }
</style>
