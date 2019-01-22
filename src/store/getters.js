/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

const getters = {
  menuList: state => state.common.menuList,
  menuId: state => state.common.menuId,
  userInfo:state => state.common.userInfo,
  user:state => state.common.user,
  btnMenu:state => state.common.btnMenu,
  token:state => state.common.token,

  lockPasswd: state => state.lock.lockPasswd,
  isLock: state => state.lock.isLock,

  isFullScren:state => state.setting.isFullScren,
  collapse:state => state.setting.collapse,
  isfirst:state => state.setting.isfirst,

  tagList: state => state.tag.tagList,
  tagCurrent: state => state.tag.tagCurrent,
  tagWel: state => state.tag.tagWel,
  tag: state => state.tag.tag,
  istag: state => state.tag.istag,

  theme: state => state.theme.theme,
  aside: state => state.theme.aside,
  themeUrl: state => state.theme.themeUrl,

}
export default getters
