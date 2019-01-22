import types from "../mutation-types";
import { setStore, getStore, removeStore } from '../../common/store'
const theme = {
  state: {
    theme: getStore({
      name: 'theme'
    }) || '#2B4560',
    aside: getStore({
      name: 'aside'
    }) || {
      backskin:'#00142a',
      skin: '#00142a',
      textSkin: '#ffffffa6',
      activeSkin: '#409eff',
    },
    themeUrl:getStore({
      name: 'themeUrl'
    }) || 'theme2',
  },
  mutations: {
    [types.SET_THEME] (state, color) {
      state.theme = color
      setStore({
        name: 'theme',
        content: state.theme
      })
    },
    [types.SET_THEME_URL] (state, url) {
      state.themeUrl = url
      setStore({
        name: 'themeUrl',
        content: state.themeUrl
      })
    },
    [types.SET_ASIDE] (state, color) {
      state.aside = color
      setStore({
        name: 'aside',
        content: state.aside
      })
    },
  }
}
export default theme
