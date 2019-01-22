import pathToRegexp from "path-to-regexp";
import * as URL from '../api'

export const getSessionKey = (key, defaultValue) => {
  const item = window.sessionStorage.getItem(key);
  if (item == undefined && defaultValue != undefined) {
    return defaultValue
  }
  return item;
}

export const getBaseUrl = (url) => {
  var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
  reg.exec(url);
  return RegExp.$1;
}
export const findMenuId = (treeArray, href, idPropName = "href", childrenPropName = "children") => {
  if (!treeArray || treeArray == null || treeArray.length <= 0)return null;
  for (var i = 0; i < treeArray.length; i++) {
    if (treeArray[i][idPropName] == href) {
      return treeArray[i]['id'];
    } else {
      var result = findMenuId(treeArray[i][childrenPropName], href, idPropName, childrenPropName);
      if (result != null) {
        return result;
      }
    }
  }
  return null;
}
export const keyMirror = (obj) => {
  var key
  var mirrored = {}
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        mirrored[key] = key
      }
    }
  }
  return mirrored
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  var data = array.map(item => ({...item}))
  var result = []
  var hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    var hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export function getCurrentMenu(location, arrayMenu) {
  if (!!arrayMenu) {
    var current = []
    for (var i = 0; i < arrayMenu.length; i++) {
      const e = arrayMenu[i];
      const child = getCurrentMenu(location, e.children);
      if (!!child && child.length > 0) {
        child.push({...e, children: null});
        return child;
      }
      if (e.href && pathToRegexp(e.href).exec(location)) {
        current.push({...e, children: null});
        return current;
      }
    }
    return current;
  }
  return null;
}

/**
 * 初始化一些原型
 */
export function initFunction() {
  Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1,                 //月份
      "d+": this.getDate(),                    //日
      "h+": this.getHours(),                   //小时
      "m+": this.getMinutes(),                 //分
      "s+": this.getSeconds(),                 //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }
  /*
  * 方法:Array.remove(dx) 通过遍历,重构数组
  * 功能:删除数组元素.
  * 参数:dx删除元素的下标.
  */
  Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
      return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
      if (this[i] != this[dx]) {
        this[n++] = this[i]
      }
    }
    this.length -= 1
  }
  //根据传入的值删除数组中对应的值
  // Array.prototype.removeByValue = function (attr) {
  //   for (var i = 0; i < this.length; i++) {
  //     function isObjectValueEqual(a, b) {
  //       // Of course, we can do it use for in
  //       // Create arrays of property names
  //       var aProps = Object.getOwnPropertyNames(a);
  //       var bProps = Object.getOwnPropertyNames(b);
  //       // If number of properties is different,
  //       // objects are not equivalent
  //       if (aProps.length != bProps.length) {
  //         return false;
  //       }
  //       for (var i = 0; i < aProps.length; i++) {
  //         var propName = aProps[i];
  //         // If values of same property are not equal,
  //         // objects are not equivalent
  //         if (a[propName] !== b[propName]) {
  //           return false;
  //         }
  //       }
  //       // If we made it this far, objects
  //       // are considered equivalent
  //       return true;
  //     }
  //
  //     if (isObjectValueEqual(this[i], attr)) {
  //       this.splice(i, 1);
  //       break;
  //     }
  //   }
  // }

  /**
   * 删除数组中的对象，根据id来匹配，id相同则删除对应的对象
   * @param attr
   */
  Array.prototype.removeByValueId = function (attr) {
    var valueIndex = null;
    this.forEach((value, index) => {
      if (value.id == attr.id) {
        valueIndex = index;
      }
    });
    if(!!valueIndex){
      this.splice(valueIndex, 1);
    }
  };
}

/*获取数组中id的数组*/
export function getArrayIds(array) {
  var ids = [];
  $.each(array, (index, value) => {
    ids.push(value.id);
  })
  return ids;
}

/*获取数组中名称的数组*/
export function getNamesFromArray(array) {
  var names = [];
  $.each(array, (index, value) => {
    names.push(value.name);
  })
  return names;
}

/*根据id获取中文名称*/
export function getArrayNames(array, id) {
  var name = null;
  $.each(array, (index, value) => {
    if (value.id == id) {
      name = value.name;
    }
  })
  return name;
}

/*根据中文名称获取id*/
export function getIdByNameInArray(array, name) {
  var id = null;
  $.each(array, (index, value) => {
    if (value.name == name) {
      id = value.id;
    }
  })
  return id;
}

/*根据id获取数组中的对象*/
export function getObjByIdInArray(array, id) {
  var temp = null;
  $.each(array, (index, value) => {
    if (value.id == id) {
      temp = value;
    }
  })
  return temp;
}

/*根据当前环境在控制台打印接受到的参数*/
export function consoleLog(obj) {
  var isConsole = URL.isNotProd;
  if (isConsole) {

    try {
      if (!!obj.content) {

      }
    } catch (e) {
    }
  }
}

//将json格式转换为form-data格式
export function parseJsonToFormData(json) {
  if (!isJson(json)) {
    return json;
  }
  var resultJson = {};
  for (var item in json) {
    var val = json[item];
    if (isJson(val)) {
      var cJson = parseJsonToFormData(val);
      for (var citem in cJson) {
        resultJson[item + "." + citem] = cJson[citem];
      }
    } else if (val instanceof Array) {
      for (var citem in val) {
        var cval = val[citem];
        if (isJson(cval)) {
          var ccJson = parseJsonToFormData(cval);
          for (var ccitem in ccJson) {
            resultJson[item + "[" + citem + "]" + "." + ccitem] = ccJson[ccitem];
          }
        } else {
          resultJson[item + "[" + citem + "]"] = cval;
        }
      }
    } else {
      resultJson[item] = val;
    }
  }
  return resultJson;
}

//判断是否是json
export function isJson(obj) {
  var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  return isjson;
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }
  document.addEventListener('fullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('mozfullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('msfullscreenchange', function (e) {
    listen()
  })
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  let isFullscreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
  return isFullscreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}

/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {
  let reqUrl = url
  if (url.indexOf('#') !== -1 && url.indexOf('http') === -1) {
    const port = reqUrl.substr(reqUrl.indexOf(':'))
    reqUrl = `/myiframe/urlPath?src=${baseUrl}${port}${reqUrl.replace('#', '').replace(port, '')}}&name=${name}`
  } else if (url.indexOf('http') !== -1) {
    reqUrl = `/myiframe/urlPath?src=${reqUrl}&name=${name}`
  } else {
    reqUrl = `${reqUrl}`
  }
  return reqUrl
}

/**
 * 总体路由设置器
 */
export const setUrlPath = ($route) => {
  let value = ''
  if ($route.query.src) {
    value = $route.query.src
  } else {
    value = $route.path
  }
  return value
}
/**
 * 设置浏览器头部标题
 */
export const setTitle = function (title) {
  title = title ? `${title}—PIM 产品信息管理系统` : 'PIM 产品信息管理系统';
  window.document.title = title
}
