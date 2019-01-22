<!--
  -    Copyright (c) 2018-2025, lengleng All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the pig4cloud.com developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: lengleng (wangiegie@gmail.com)
  -->

<template>
  <div>
    <i class="icon iconfont icon-jingzi theme-color" @click="handleLock" style="font-size: 20px;"></i>
    <el-dialog v-dialogDrag title="选择主题" :visible.sync="box" width="500px" append-to-body>
      <el-card class="box-card">
        <el-radio-group v-model="theme" size="mini">
          <el-radio label="theme1" border>默认主题</el-radio>
          <el-radio label="theme2" border>深蓝主题</el-radio>
          <el-radio label="theme3" border>幻彩主题</el-radio>
          <el-radio label="theme4" border>丛式主题</el-radio>
          <!--<el-radio label="theme3" border>绿色主题</el-radio>-->
        </el-radio-group>
        <span id="mini-el"></span>
      </el-card>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleOk" size="mini">确 定</el-button>
    </span>
    </el-dialog>
  </div>

</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from '../../store/mutation-types'
  import defaultData from '../../services/mock.data'
  export default {
    name: "theme",
    data() {
      return {
        box: false,
        theme:'theme1',
        index:1
      };
    },
    computed:{
      ...mapGetters([
        'themeUrl'
      ]),
    },
    created(){
      this.theme = this.themeUrl;
    },
    methods: {
      ...mapMutations({
        setAside: types.SET_ASIDE,
        setThemeUrl: types.SET_THEME_URL,
      }),
      handleLock() {
        this.box = true;
      },
      getCSSString(url) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const head = document.getElementsByTagName("head")[0];
            let styleTag = document.getElementById("theme-style");
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
      handleOk(){
        this.setThemeUrl(this.theme);
        this.setAside(defaultData['theme'][`${this.theme}`]);
        this.getCSSString(`static/less/${this.theme}.scss`);
        this.box = false;

      }
    }
  };
</script>

<style>

</style>
