import types from "../mutation-types";
import { setStore, getStore, removeStore } from '../../common/store'
const tagObj = {
  label: '',
  value: '',
  query: '',
  num: '',
  close: true,
}
const tagNslist = ['/lock','login','/404'];
function setFistTag(list) {
  if (list.length == 1) {
    list[0].close = false;
  } else {
    list.some(a => {
      a.close = true
    })
  }
  return list;

}
const tag = {
  state: {
    tagList: getStore({ name: 'tagList' }) || [],
    tag: getStore({ name: 'tag' }) || tagObj,
    tagWel: {
      label: "产品分类",
      value: "/"
    },
    tagCurrent: getStore({ name: 'tagCurrent' }) || [],
    istag:false,
  },
  mutations: {
    [types.SET_SHOW_TAG] (state, isCollapse) {
      state.istag = !state.istag;
    },
    [types.DEL_ALL_TAG] (state, action) {
      state.tag = tagObj;
      state.tagList = [];
      state.tagList.push(state.tagWel);
      removeStore({ name: 'tag' });
      removeStore({ name: 'tagList' });
    },

    [types.DEL_TAG_OTHER] (state, action) {
      state.tagList.forEach((ele, num) => {
        if (ele.value === state.tag.value) {
          state.tagList = state.tagList.slice(num, num + 1)
          state.tag = state.tagList[0];
          state.tagList[0].close = false;
          setStore({ name: 'tag', content: state.tag,type:'session' })
          setStore({ name: 'tagList', content: state.tagList,type:'session' })
        }
      })

    },
    [types.DEL_TAG] (state, action) {
      state.tagList.forEach((ele, num) => {
        if (ele.value === action.value) {
          state.tagList.splice(num, 1)
          state.tagList = setFistTag(state.tagList);
          setStore({ name: 'tag', content: state.tag,type:'session' })
          setStore({ name: 'tagList', content: state.tagList,type:'session' })
        }
      })
    },
    [types.ADD_TAG] (state, action){
      if(tagNslist.some(a => a === action.value)) return
      state.tag = action;
      setStore({ name: 'tag', content: state.tag,type:'session' })
      if (state.tagList.some(a => a.value === action.value)) return
      state.tagList.push({
        label: action.label,
        value: action.value,
        query: action.query,
      })
      state.tagList = setFistTag(state.tagList);
      setStore({ name: 'tagList', content: state.tagList,type:'session' })
    },
    [types.SET_TAG_CURRENT](state, tagCurrent) {
      state.tagCurrent = tagCurrent;
      setStore({ name: 'tagCurrent', content: state.tagCurrent,type:'session' })
    },
    [types.SET_TAG](state, value) {
      state.tagList.forEach((ele, num) => {
        if (ele.value === value) {
          state.tag = state.tagList[num];
          setStore({ name: 'tag', content: state.tag,type:'session' })
        }
      });
    },
  }
}
export default tag
