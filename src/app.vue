<template>
  <div class="entry">
    <transition mode="out-in" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" :duration="{ enter: 2000, leave: 2000 }">
      <tag-list v-if="istag"></tag-list>
    </transition>
    <diyHeader></diyHeader>
    <diy-aside></diy-aside>
    <div class="content-wrapper" :class="{ slideCollapse: isCollapse,mobileSide:!isCollapse}" style="height: 100%;" >
      <el-scrollbar tag="div" wrapClass="content-scrollbar" style="height:100%;" id="wrapper">
        <section class="content">
          <router-view class="router"></router-view>
          <imp-footer title="PIM产品信息系统管理 Powered by JFusion"></imp-footer>
        </section>
      </el-scrollbar>
    </div>

  </div>
</template>

<script>
  import "font-awesome/css/font-awesome.css";
  import diyHeader from './components/layout/header'
  import diyAside from './components/layout/aside'
  import impFooter from './components/layout/footer'
  import tagList from './components/layout/tags'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from './store/mutation-types'
  import * as api from "./api"
  import * as sysApi from "./services/sys"

  export default {
    name: 'entry',
    data() {
      return {

        changed: false
      }
    },
    components: {diyHeader, diyAside, impFooter, tagList},
    computed: {
      ...mapGetters({
        isCollapse: 'collapse',
        userInfo: 'userInfo',
        tagWel: 'tagWel',
        istag: 'istag',

      })
    },
    methods:{
      ...mapMutations({
        addTag: types.ADD_TAG,
      }),
    },
    mounted() {

    },
    created() {
      this.addTag(this.tagWel);
    },
    watch: {}
  }
</script>

<style lang="scss">
  @import "assets/css/index";
  .sysCall {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 300px;
    height: 300px;
  }
  .entry{
    width: 100%;
    height: 100%;
    position: relative;
  }
  body{
    background-color: #eee;
    padding: 0px;
    margin: 0px;
  }

  .header {
    position: fixed;
    min-width: 100%;
    -webkit-box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    z-index: 1999;
    -webkit-animation-name: slideInDown;
    animation-name: slideInDown;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    height: 50px;
    background-color: #fff;
    text-align: left;
    line-height: 50px;

  }

  .animated {
    animation-duration: .2s;
  }

  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
    margin: 0;
    padding: 0;
  }

  *, :after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .router {
    min-height: 500px;
    padding-top: 50px;
  }

  .content-wrapper {
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    padding-top: 50px;
    /*background-color: #f5f5f5;*/
  }

  .inWrap {
    margin-left: 44px;
  }

  .outWrap {
    margin-left: 235px;
  }

  .content-scrollbar {
    height: calc(100vh - 50px) !important;
    overflow-x: hidden!important;
  }

  .content-wrapper .el-scrollbar__bar.is-vertical {
    display: none;
    background-color: #eee;
  }


  .slideCollapse {
    margin-left: 44px;
  }

  .mobileSide {
    margin-left: 235px;
    box-sizing: border-box;
  }


</style>
