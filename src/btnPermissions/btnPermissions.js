import Vue from "vue";
import store from "../store"
const has = Vue.directive('has', {
  inserted: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      // el.parentNode.removeChild(el);
    }
  }
});
//权限检查方法
Vue.prototype.$_has = function(value) {
  let isExist=false;
  let btnMenu= store.getters.btnMenu;
  if(btnMenu == undefined || btnMenu == null){
    return false;
  }
  if(btnMenu.some((a) =>{a == value})){
    isExist=true;
  }
  return isExist;
};
export {has}
