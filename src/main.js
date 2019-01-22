import '@/assets/css/iconfont.scss'
import "babel-polyfill";
import Vue from "vue";
import frame from "./frame.vue";
import router from "./router";
import store from "./store";
import axios from "./common/axios";
import VueAxios from 'vue-axios'
import 'animate.css'
import $ from 'expose-loader?$!jquery';
import filters from "./filters";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ImpPanel from "./components/panel.vue";
import './assets/js/directives'

Vue.prototype.$http = axios;

Vue.axios = axios;
Vue.http = axios;
Vue.use(VueAxios, axios);

Vue.component(ImpPanel.name, ImpPanel);
Vue.use(ElementUI);
Vue.directive('has', {
  bind: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  },

});
// store.commit('SET_BTN_MENU')
//权限检查方法
Vue.prototype.$_has = function(value) {
  let isExist=false;
  let btnMenu= store.getters.btnMenu;
  if(btnMenu == undefined || btnMenu == null){
    return false;
  }

  if(btnMenu.some((a) => a == value.trim())){
    isExist=true;
  }
  return isExist;
};

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  store,
  router,
  el: "#app",
  render: h => h(frame)
})
