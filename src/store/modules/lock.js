import types from "../mutation-types";
import { setStore, getStore, removeStore } from '../../common/store'
const lock = {
  state: {
    isLock: getStore({
      name: 'isLock'
    }) || false,
    lockPasswd: getStore({
      name: 'lockPasswd'
    }) || '',
  },
  mutations: {
    [types.SET_LOCK](state, action){
      state.isLock = true;
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
    },
    [types.SET_LOCK_PASSWD](state, lockPasswd){
      state.lockPasswd = lockPasswd
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session'
      })
    },
    [types.CLEAR_LOCK](state, action){
      state.isLock = false
      state.lockPasswd = ''
      removeStore({
        name: 'lockPasswd'
      })
      removeStore({
        name: 'isLock'
      })
    }
  }
}
export default lock
