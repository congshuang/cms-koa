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
  <div class="lock-container pull-height">
    <div class="lock-wrapper">
      <div class="lock-form animated bounceInDown">
        <div class="animated" :class="{'shake':passwdError,'bounceOut':pass}">
          <h3 style="color: #fff;">{{userInfo.loginName}}</h3>
          <el-input placeholder="请输入锁屏密码" type="password" class="input-with-select animated" v-model="passwd" @keyup.enter.native="handleLogin">
            <el-button slot="append" icon="icon iconfont icon-kaisuo" @click="handleLogin"></el-button>
            <el-button slot="append" icon="icon iconfont icon-tuichu" @click="handleLogout"></el-button>
          </el-input>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import { resolveUrlPath } from "@/common/utils";
import types from '../../store/mutation-types'
export default {
  name: "lock",
  data() {
    return {
      passwd: "",
      passwdError: false,
      pass: false
    };
  },
  created() {},
  mounted() {},
  computed: {

    ...mapGetters(["tag", "lockPasswd","userInfo"])
  },
  props: [],
  methods: {
    ...mapMutations({
      clearLock: types.CLEAR_LOCK
    }),
    handleLogout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    },
    handleLogin() {
      if (this.passwd != this.lockPasswd) {
        this.passwd = "";
        this.$message({
          message: "解锁密码错误,请重新输入",
          type: "error"
        });
        this.passwdError = true;
        setTimeout(() => {
          this.passwdError = false;
        }, 1000);
        return;
      }
      this.pass = true;
      setTimeout(() => {
        this.clearLock();

        this.$router.push({ path: resolveUrlPath(this.tag.value || "/") });
      }, 1000);
    }
  },
  components: {}
};
</script>

<style lang="scss">
.lock-container {
  background-image: url("../../assets/img/login.png");
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100%;
}
.lock-wrapper{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.lock-form {
  width: 300px;
}
</style>
