<template>

  <aside class="main-sidebar animated showSlide expandSide" :class="{out: !isCollapse,in: isCollapse}"
         :style="{background: aside.backskin}">

    <div id="aside-top" :class="{isOut: !isCollapse,isIn: isCollapse}" :style="{background: aside.skin}">
      <i class="fa fa-outdent" v-if="!isCollapse" @click="toggle"></i>
      <i class="fa fa-indent" v-else @click="toggle"></i>
      <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <span v-show="!isCollapse" style="font:normal 16px/40px 微软雅黑,ans-serif" class="theme-idx">系统菜单</span>
      </transition>
    </div>
    <el-scrollbar tag="div" wrapClass="vue-scrollbar" :style="{background: aside.skin}">
      <div class="sidebar">
        <el-menu
          :default-active="onRoutes"
          :default-openeds="onRouteKeys"
          :collapse="isCollapse"
          class="el-menu-style"

          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          router

        >
          <!--v-if="item.remarks == 'pim'"-->
          <template v-for="(item,idx) in currentMenuList">
            <el-submenu :index="menuindex(item,idx)" v-if="item.children && item.children.length>0 ">
              <template slot="title">
                <i :class="'fa '+item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <template v-for="child in item.children">
                <sub-menu v-if="child.children && child.children.length>0" :param="child"></sub-menu>
                <el-menu-item :index="child.path" v-else >
                  <i :class="'fa '+child.icon"></i>
                  <span>{{child.name}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item :index="item.path" v-else>
              <i :class="'fa '+item.icon"></i>
              <span>{{item.name}}</span></el-menu-item>
          </template>
        </el-menu>
      </div>
    </el-scrollbar>
  </aside>
</template>

<script>
  import * as api from "../../api"
  import * as sysApi from '../../services/sys'
  import subMenu from "./subMenu.vue"
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from '../../store/mutation-types'
  import treeter from "../../components/treeter"

  export default {
    name: 'diyAside',
    mixins: [treeter],
    props: {
      show: Boolean,
    },
    data() {

      return {
        isCollapse: false,
        searchKey: "",

        tempMenuList: [],
      }
    }, components: {
      subMenu,
    }, computed: {
      //当前菜单列表,包含所有的菜单或者查询到的菜单
      currentMenuList() {
        console.log('currentMenuList',this.menuList)
        return this.tempMenuList.length > 0 ? this.tempMenuList : this.menuList;
      },
      onRoutes() {
        return this.tempMenuList.length > 0 || this.$route.path ? this.$route.path : this.$route.path;
      },
      onRouteKeys() {
        const getParentArray = (path, ms, kas = []) => {
          if (ms && ms.length > 0) {
            for (var k = 0, length = ms.length; k < length; k++) {
              if (path == ms[k].href) {
                kas.push(ms[k].href);
                break;
              }
              var i = kas.length;
              if (ms[k].children && ms[k].children.length > 0) {
                getParentArray(path, ms[k].children, kas);
              }
              if (i < kas.length) {
                kas.push(ms[k].href);
              }
            }
          }

          return kas.reverse();
        }

        //菜单筛选后的默认展开
        let filterArray = [];
        this.tempMenuList.forEach((value) => {
          if ((null != value.children && value.children.length > 0) || !!value['selected']) {
            filterArray.push(value.href);
          }
        });

        return this.tempMenuList.length == 0 ? getParentArray(this.$route.path, this.menuList) : filterArray;
      },
      // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'menuList',
        'aside'
      ])
    }, created: function () {
      // this.load();

    }, methods: {

      menuindex(item,idx){
        return item.href?item.href:(idx == 0?"":'/'+idx);
      },
      ...mapMutations({
        setCollapse: types.SET_COLLAPSE,
        setMenuId: types.SET_MENU_ID
      }),
      //遍历所有菜单，记录匹配的菜单项
      getQueryIds(array, menus) {
        array.forEach((value) => {
          if ("" !== this.searchKey && value.name.indexOf(this.searchKey) != -1) {
            menus.push(value);
          }
          if (null != value.children && value.children.length > 0) {
            this.getQueryIds(value.children, menus);
          }
        });
      },
      //用于递归复制所有菜单
      copyMenu(array, obj) {
        array.forEach((value) => {
          let temp = {};//用于复制对象
          for (var o in value) {
            if (o == 'children' || o == 'childrens') {
              continue;
            }
            temp[o] = value[o];
          }
          temp.children = null;
          obj[value.id] = temp;

          if (null != value.children && value.children.length > 0) {
            this.copyMenu(value.children, obj);
          }
        });
      },
      search(target) {
        if (this.searchKey == '') {
          this.tempMenuList = [];
          return;
        }

        //记录
        var menus = [];//记录符合条件的菜单
        //在本身菜单中查找跟输入值匹配的菜单
        this.getQueryIds(this.menuList.slice(0), menus);
        //记录当前所有的菜单项
        var obj = {};
        this.copyMenu(this.menuList.slice(0), obj);
        //记录数组的菜单项
        menus.forEach((value) => {
          if (null != value.parentId) {
            var parent = obj[value.parentId];
            if (null == parent.children) {
              parent.children = [];
            }
            //判断父节点中是否存在当前节点
            let isNotAdd = parent.children.some((child) => {
              if (child.id == value.id) {
                return true;
              }
            })

            if (!isNotAdd) {
              parent.children.push(value);
            }
          } else {
            //因为这是一个父节点，不能单独作为菜单，必须加上子菜单
            obj[value.id]['selected'] = true;
            this.menuList.forEach((menu) => {
              if (menu.id == value.id) {
                obj[value.id].children = menu.children;
              }
            });
          }
        });
        //查询到的菜单列表
        var menuList = [];
        for (var o in obj) {
          let value = obj[o];
          if ((value.children != null && value.children.length > 0) || (null == value.parentId && !!value['selected'])) {
            menuList.push(value);
          }
        }
        this.tempMenuList = menuList;
      },
      toggle() {
        this.isCollapse = !this.isCollapse;
        this.setCollapse(this.isCollapse);
      },
      handleOpen(key, keyPath) {

        // if(key == "/maininfo"){

        //   this.$router.push({path:"/maininfo"});
        // }
      },
      handleClose(key, keyPath) {
        // if(key == "/maininfo"){

        //   this.$router.push({path:"/maininfo"});
        // }
      },
      handleSelect(key, keyPath) {


      },
      ...mapActions({
        load: 'loadMenuList', // 映射 this.load() 为 this.$store.dispatch('loadMenuList')
        // loadBtnMenu: 'loadBtnMenu',
      })
    },
    mounted() {
      console.log('----',this.aside.textSkin)
    },
    watch: {


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .showSlide {
    animation-duration: .2s;
    animation-name: slideInLeft;
  }

  .el-menu {
    border-right: none!important;
  }

  .hideSlide {
    animation-duration: .2s;
    animation-name: slideOutLeft;
  }

  .main-sidebar {

    background-color: #ffffff;
    position: fixed;
    box-sizing: border-box;
    top: 50px;
    left: 0;
    bottom: 0;
    z-index: 2000;
    height: calc(100vh - 50px);
    -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  }

  .out {
    width: 235px;
  }

  .in {
    width: 50px;
  }

  .el-menu-style,
  .el-menu-style .el-menu {
    background-color: #aaa6a0;
  }

  .el-menu-style .el-menu-item:hover,
  .el-menu-style .el-submenu__title:hover {

  }

  .el-menu-style .el-submenu .el-menu-item {
    height: 45px;
    line-height: 45px;
  }

  .el-menu-style .el-menu-item,
  .el-menu-style .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }

  .main-sidebar .el-menu--collapse {
    width: 50px;
  }

  .main-sidebar .el-menu--collapse > .el-menu-item,
  .main-sidebar .el-menu--collapse > .el-submenu > .el-submenu__title {
    padding-left: 13px !important;
  }

  .vue-scrollbar {
    height: calc(100vh - 95px)!important;
  }

  .main-sidebar .el-scrollbar__bar.is-vertical {
    display: none;
  }

  .sidebar {
    min-height: 450px;
  }

  .el-menu .fa {
    margin-right: 10px;
  }

  #aside-top {
    width: 100%;
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    cursor: pointer;
    -webkit-transition: border-color .3s, background-color .3s, color .3s;
    transition: border-color .3s, background-color .3s, color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    white-space: nowrap;
    list-style: none;
  }

  .isOut {
    padding: 0 20px;
  }

  .isIn {
    padding: 0 13px;
  }




</style>
