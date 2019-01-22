import types from "../mutation-types";

const setting = {
  state: {
    isFullScren:false,
    collapse:false,
    isfirst:true,
  },
  mutations: {
    [types.SET_COLLAPSE] (state, isCollapse) {
      state.collapse = isCollapse
    },
    [types.SET_ISFRIST] (state, isfirst) {
      state.isfirst = isfirst
    },
    [types.SET_FULLSCREN] (state, isCollapse) {
      state.isFullScren = !state.isFullScren;
    },
  }
}
export default setting
