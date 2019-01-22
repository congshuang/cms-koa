<template>
  <header class="main-header animated theme-l3">
    <div class="logo theme-l4" :style="{width:collapse?'50px':'235px','padding-left':collapse?'0px':'2px'}">
      <div class="logo-lg" style="font-size: 17px;text-align: left">
        <!--<span v-if="ifor" class="logo_img"><i-->
        <!--class="fa fa-diamond back-theme"></i></span><img class="logo_img" :src='getpath(user.content)' v-else>-->
        <!--(<span style="color: red;">机密</span>)-->
        <div class="mip-title theme-color" @click="toHome"><b v-if="!collapse"><span class="logo-theme">PIM</span><span style="font-size: 15px;">产品信息管理系统</span>(<span style="color: red;">机密</span>)</b><b v-else class="logo-title-mini">PIM</b></div>
      </div>
    </div>
    <nav class="navbar theme-l2">
      <div class="navbar-custom-menu"
           style="display: flex;
                align-items: center;">
        <!-- <span class="back-theme">欢迎您登录!</span> -->
        <el-tooltip class="item" effect="dark" :content="istag?'隐藏导航':'显示导航'" placement="bottom">
            <span style="margin-right: 10px;">
               <i :class="istag?'icon iconfont icon-yincangdaohangshitu':'icon iconfont icon-xianshidaohangshitu'" class="theme-color" @click="handleShowTag" style="font-size: 20px;"></i>
            </span>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom">
          <span style="margin-right: 10px;">
            <top-lock></top-lock>
          </span>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="主题色" placement="bottom">
          <span style="margin-right: 10px;">
            <top-theme></top-theme>
          </span>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="主题" placement="bottom">
          <span style="margin-right: 10px;">
            <theme></theme>
          </span>
        </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="isFullScren?'退出全屏':'全屏'" placement="bottom">
            <span style="margin-right: 10px;">
               <i :class="isFullScren?'icon iconfont icon-tuichuquanping':'icon iconfont icon-quanping'" @click="handleScreen" class="theme-color" style="font-size: 20px;"></i>
            </span>
          </el-tooltip>
        <el-badge :value="val" class="item" style="margin-right:20px">
          <div class="custom" @click="tomlist">
            <i class="fa fa-bell"></i>
          </div>
        </el-badge>

        <el-dropdown trigger="click" class="navbar-dropdown theme-l1" hide-on-click
                     style="margin-right:10px;">
          <div class="el-dropdown-link">
            <img :src='getsrc(userInfo.photo)'
                 style="width: 25px;height: 25px;border-radius: 50%; vertical-align: middle;">
            <span class="theme-color">{{userInfo.username}}</span>
            <i class="fa fa-angle-down theme-color"></i>
          </div>
          <el-dropdown-menu slot="dropdown" style="padding: 0px">
            <el-dropdown-item class="message-list back-theme" v-if="false">
              <i class="fa fa-cogs"></i>
              <span @click="changeLimit">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item class="message-list back-theme" >
              <div @click="logout" style="width: 100%;height: 100%;">
                <i class="fa fa-power-off"></i>
                <span>退出</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item class="message-list back-theme" v-if="isshow">
              <div @click="routeSet" style="width: 100%;height: 100%;">
                <i class="fa fa-wrench"></i>
                <span >密级权限申请</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item class="message-list back-theme"  v-has="`enter:manager`">
              <div @click="goBackManage" style="width: 100%;height: 100%;">
                <i class="fa fa-wrench"></i>
                <span >后台管理</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </nav>

  </header>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import defaultData from '../../services/mock.data'
  import * as api from '../../api'
  import types from '../../store/mutation-types'
  import topLock from  '../top-lock'
  import topTheme from "../layout/top-theme";
  import theme from "../layout/theme";
  import { fullscreenToggel, listenfullscreen } from "@/common/utils";
  import { setStore, getStore, removeStore } from '../../common/store';
  export default {
    name: 'myheader',
    data() {
      return {
        isshow: false,
        sysLen: 0,
        listLen: 0,
        user: {},
        val:'0'
      }
    },
    components:{
      topLock,
      topTheme,
      theme
    },
    computed: {

      ...mapGetters([
        'userInfo',
        'menuList',
        'collapse',
        'isFullScren',
        'istag',
        'themeUrl'

      ]),
      ifor() {
        let tf = (this.user.content == "" || !this.user.content);
        return tf;
      },

    },
    methods: {
      handleScreen() {
        fullscreenToggel();

      },
      tomlist(){
        this.$router.push({path:'/messageLists'});
      },
      goBackManage(){
        window.location.href = 'modules/index/index.html';
      },
      setTimeDate(date) {
        date = new Date(date);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + "-" + m + "-" + d;
      },
      getpath(path) {

        return "data:image/png;base64," + path;
      },
      changeTo() {
        let redirectUrl = '/sys/chatting/inbox';
        this.$router.push({path: redirectUrl});

      },
      send(){
        this.$http.get('/test/sendMsg').then((res) =>{

        }).catch(() =>{

        })
      },
      getsrc(path) {
          return require('../../../static/img/user.png');
      },
      toHome(){
        this.$router.push({path:'/'});
      },
      logout() {
        this.$http.get(api.SYS_LOGOUT)
          .then(res => {
            if(res.data.code == 200){
              this.setUserInfo("");
              this.loadMenu([]);
              this.setToken("");
              setStore({name:'menuList',content:[]});
              setStore({name:'token',content:""});
              setStore({name:'userInfo',content:''});
              this.$router.push({path:'/login'});
            }

          });
      }, changeLimit() {
        this.$router.push({path: '/resetPwd'});
      }, routeSet() {
        this.$router.push({path: '/securityApply'});
      },
      ...mapMutations({
        setScreenFlag: types.SET_FULLSCREN,
        setShowTag: types.SET_SHOW_TAG,
        setAside: types.SET_ASIDE,
        setUserInfo: types.SET_USER_INFO,
        loadMenu: types.LOAD_MENU,
        setToken: types.SET_TOKEN,
      }),

      setScreen() {
        console.log(1);
        this.setScreenFlag();
      },
      handleShowTag(){
        this.setShowTag();
      },
      getCSSString(url) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const head = document.getElementsByTagName("head")[0];
            let styleTag = document.getElementById('theme-style');
            if (!styleTag) {
              styleTag = document.createElement("style");
              styleTag.setAttribute("id", "theme-style");
              head.appendChild(styleTag);
            }
            styleTag.innerText = xhr.responseText;
          }
        };
        xhr.open("GET", url);
        xhr.send();
      },

    },
    mounted() {
      // this.$http.get(`${api.SYS_LOGIN_USER}`).then((res) =>{
      //   this.$http.get(`${api.SYS_LOGIN_getNeedDealCounter}${res.data.data.id}`).then((data) =>{
      //     this.val = data.data.data.counter;
      //   });
      // });
      listenfullscreen(this.setScreen);
      if (this.menuList !== "" && this.menuList !== null) {
        this.isshow = true;
      }

      var goEasy = new GoEasy({
        appkey: 'BC-516df7a54bf043308b83c6171061a4fd'
      });
      goEasy.subscribe({
        channel: 'pim_flow_chanel',
        onMessage: function(message){

          let msg = message.content;
        }
      });

    },
    created() {
      this.getCSSString(`static/less/${this.themeUrl}.scss`);

    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .animated {
    animation-duration: .2s;
  }

  .main-header a {
    text-decoration: none;
    color: #48576a;
    background-color: #ee6060;
  }

  .main-header {
    position: fixed;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    z-index: 1999;
    animation-name: slideInDown;
    animation-fill-mode: both;
    color: #48576a;
  }

  .main-header .navbar .sidebar-toggle {
    float: left;
    background-color: transparent;
    background-image: none;
    padding: 15px 15px;
    font-family: fontAwesome;
    line-height: 20px;
  }

  .main-header .navbar .sidebar-toggle:before {
    content: "\f03b";
  }

  .main-header {
    background-color: #ffffff;
  }

  .main-header .logo {
    -webkit-transition: width 0.3s ease-in-out;
    -o-transition: width 0.3s ease-in-out;
    transition: width 0.3s ease-in-out;
    display: block;
    float: left;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    width: 235px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 0 2px 0px 2px;
    font-weight: 300;
    overflow: hidden;
    text-decoration: none;
    color: #fff;
  }

  .main-header .logo .logo-lg {
    display: block;
    height: 38px;
    line-height: 38px;
    margin-top: 6px;
  }

  .main-header .navbar {
    -webkit-transition: margin-left 0.3s ease-in-out;
    -o-transition: margin-left 0.3s ease-in-out;
    transition: margin-left 0.3s ease-in-out;
    margin-bottom: 0;
    margin-left: 235px;
    border: none;
    min-height: 50px;
    border-radius: 0;

  }

  .layout-top-nav .main-header .navbar {
    margin-left: 0;
  }

  body.hold-transition .main-header .navbar,
  body.hold-transition .main-header .logo {
    -webkit-transition: none;
    -o-transition: none;
    transition: none;
  }

  .main-header .navbar .sidebar-toggle {
    display: block;
  }

  .main-header .navbar .sidebar-toggle:hover {
    background: rgba(255, 255, 255, .8);
  }

  .main-header .logo {
    border-bottom: 0 solid transparent;
  }

  @media (max-width: 800px) {

    .main-header .logo {
      display: none;
    }

    .main-header .navbar {
      margin: 0;
    }

    .main-header .logo, .main-header .navbar {
      width: 100%;
    }

  }

  .main-header.closeLogo .navbar {
    margin-left: 44px;
  }

  .main-header.closeLogo .logo {
    width: 44px;
    padding: 0 8px;
  }

  .main-header.closeLogo .logo .logo-lg b {
    display: none;
  }

  .main-header.closeLogo .sidebar-toggle {
    background: #f9f9f9;
  }

  .main-header.closeLogo .navbar .sidebar-toggle:before {
    content: "\f03c";
  }

  .main-header.mobileLogo .navbar .sidebar-toggle:before {
    content: "\f03a";
  }

  .navbar-custom-menu {
    float: right;
  }

  .navbar-custom-menu .el-dropdown-link {
    cursor: pointer;
    height: 50px;
    padding: 13px 5px;
    min-width: 50px;
    text-align: center;
  }



  .navbar-custom-menu .el-dropdown-link:hover {
    background: rgba(255, 255, 255, .3);
  }

  .message-list {
    list-style: none;
  }

  .message-list a {
    text-decoration: none;
    color: #666666;
  }


  .mip-title {
    float: left;
    height: 38px;
    margin-left: 5px;
  }

  .el-item {
    height: 50px;
  }

  .el-item-p {
    height: 50%;
    line-height: 25px;
  }

  .el-item-span {
    color: #b8b8b8;
  }

  .custom {
    width: 28px;
    height: 28px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }


</style>
