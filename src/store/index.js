import Vue from "vue";
import Vuex from "vuex";

import getters from './getters'

import common from './modules/common'
import lock from './modules/lock'
import setting from './modules/setting'
import tag from './modules/tag'
import theme from './modules/theme'


Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    common,
    lock,
    setting,
    tag,
    theme
  },
  getters,
})

export default store
