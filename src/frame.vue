<template>

    <router-view></router-view>
</template>

<script>
  import "font-awesome/css/font-awesome.css";
  export default{
      name:'frame',
    created(){
      // this.$router.addRoutes( [{
      //   path: '/6',
      //   component: (resolve) => require(['@/app.vue'],resolve),
      //   name: '消息列表',
      //   meta: {requiresAuth: true},
      //   children: [
      //     {path: '/messageLists', component: (resolve) => require(['@/pages/message/messageList.vue'],resolve), name: '我的消息', hidden: true},
      //   ]
      // }]);
    }
  }
</script>
<style>
  html {
    background-color: #f5f5f5;
    font-size: 14px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    min-width: 300px;
    overflow-x: hidden;
    /*overflow-y: hidden;*/
    text-rendering: optimizeLegibility;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  body {
    font: normal 12px/35px 微软雅黑,arial,sans-serif;
    line-height: 1.5;
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
  }

  .animated {
    animation-duration: .5s;
  }
</style>
