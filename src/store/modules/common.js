import types from "../mutation-types";
import * as api from "../../api";
import defaultValue from "../../services/mock.data";
import {getCurrentMenu,findMenuId} from "../../common/utils";
import Vue from "vue";
import router from "../../router";
import { setStore, getStore, removeStore } from '../../common/store'
import Vuex from "vuex";
import store from "../index";

const common = {
  state: {
    menuList: getStore({ name: 'menuList' }) || "",
    menuId: getStore({ name: 'menuId' }) || "",
    userInfo:getStore({ name: 'userInfo' }) || "",
    user:{},
    token:getStore({ name: 'token' }) || "",
    btnMenu:getStore({ name: 'btnMenu' }) || [],
  },
  mutations: {
    [types.LOAD_MENU] (state, menu) {
      state.menuList = menu;
    },
    [types.SET_TOKEN] (state, token) {
      state.token = token;
    },
    [types.SET_USER_INFO] (state, info) {
      state.userInfo = info;
    },
    [types.SET_USER] (state, info) {
      state.user = info;
    },
    [types.SET_MENU_ID] (state, id) {
      state.menuId = id;
      setStore({ name: 'menuId', content: state.menuId,type:'session' });
    },
    [types.SET_BTN_MENU] (state, list) {
      state.btnMenu = list;
    },
  },
  actions:{
    loadMenuList: ({state, commit}) => {

    },
    changeCurrentMenu: ({state, commit}, {path, matched, fullPath}) => {
      const a = getCurrentMenu(fullPath, state.menuList);
      commit(types.LOAD_CURRENT_MENU, a.reverse());
    },
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.access_token, state.refresh_token).then(() => {
          // 清除菜单
          commit(types.LOAD_MENU, []);
          commit(types.SET_USER_INFO, {name: '佚名'})
          commit('DEL_ALL_TAG')
          resolve()
        }).catch(error => {
          reject(error)
        })
        Vue.axios.get(api.SYS_MENULIST).then((res) => {

        }).catch((exp) => {

          }
        );
      })
    },
  }
}
export default common
