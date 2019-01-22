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
  <span>
    <i class="icon iconfont icon-suo theme-color" @click="handleLock" style="font-size: 20px;"></i>
     <el-dialog v-dialogDrag title="设置锁屏密码" :visible.sync="box" width="30%" append-to-body>
        <el-card class="box-card">
          <el-form :model="form" ref="form" label-width="80px">
            <el-form-item label="锁屏密码" prop="passwd" :rules="[{ required: true, message: '锁屏密码不能为空'}]">
              <el-input v-model="form.passwd" placeholder="请输入锁屏密码" size="mini"></el-input>
            </el-form-item>
          </el-form>

        </el-card>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSetLock" size="mini">确 定</el-button>
        </span>

     </el-dialog>
  </span>
</template>

<script>
  import {fullscreenToggel} from "@/common/utils";
  import {validatenull} from "@/common/validate";
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from '../store/mutation-types'

  export default {
    name: "top-lock",
    data() {
      return {
        box: false,
        form: {
          passwd: ""
        }
      };
    },
    created() {
    },
    mounted() {
    },
    computed: {
      ...mapGetters(["lockPasswd"])
    },
    props: [],
    methods: {
      ...mapMutations({
        setLockPasswd: types.SET_LOCK_PASSWD,
        setLock: types.SET_LOCK,
      }),
      handleSetLock() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.setLockPasswd(this.form.passwd);
            this.handleLock();
          }
        });
      },
      handleLock() {
        if (validatenull(this.lockPasswd)) {
          this.box = true;
          return;
        }

        this.setLock();
        setTimeout(() => {
          this.$router.push({path: "/lock"});
        }, 100);
      }
    },
    components: {}
  };
</script>

<style lang="scss" scoped>

</style>
