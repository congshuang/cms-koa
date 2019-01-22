<template>
  <el-submenu :index="item.path" v-if="item.children && item.children.length>0" class="el-menu-sub">
    <template slot="title">
      <i :class="'fa '+item.icon"></i>
      <span>{{item.name}}</span></template>
    <template v-for="child in item.children">
      <sub-menu v-if="child.children && child.children.length>0" :param="child"></sub-menu>
      <el-menu-item :index="child.path" v-else >
        <i :class="'fa '+child.icon"></i>
        <span>{{child.name}}</span></el-menu-item>
    </template>
  </el-submenu>
  <el-menu-item :index="item.path" v-else class="el-menu-each">
    <i :class="'fa '+item.icon"></i>
    <span>{{item.name}}</span>
  </el-menu-item>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from '../../store/mutation-types'
  export default {
    name: 'subMenu',
    props: ['param'],
    data: function () {
      return {item: this.param}
    },
    methods:{
      ...mapMutations({

        setMenuId: types.SET_MENU_ID
      }),


    }
  }
</script>
<style>
  .el-menu .fa {
    margin-right: 10px;
  }
</style>
