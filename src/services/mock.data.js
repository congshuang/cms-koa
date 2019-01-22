export default {
  theme:{
    theme1:{
      backskin: '#504540',
      skin: '#504540',
      textSkin: '#aaa6a0',
      activeSkin: '#aaa6a0',
    },
    theme2:{
      backskin: '#00142a',
      skin: '#00142a',
      textSkin: '#ffffffa6',
      activeSkin: '#409eff',
    },
    theme3:{
      backskin: 'rgba(0,20,42,0.4)',
      skin: 'transparent',
      textSkin: '#409eff',
      activeSkin: '#30cad5',
    },
    theme4:{
      backskin: 'rgba(0,20,42,0.4)',
      skin: 'transparent',
      textSkin: '#01e3ed',
      activeSkin: '#45f0ff',
    },
  },
  iconList:[
   'align-center', 'align-justify', 'align-left', 'align-right', 'bold', 'chain', 'chain-broken', 'clipboard', 'columns', 'copy', 'cut', 'dedent', 'eraser', 'file', 'file-o', 'file-text', 'file-text-o', 'files-o', 'floppy-o', 'font', 'header', 'indent', 'italic', 'link', 'list', 'list-alt', 'list-ol', 'list-ul', 'outdent', 'paperclip', 'paragraph', 'paste', 'repeat', 'rotate-left', 'rotate-right', 'save', 'scissors', 'strikethrough', 'subscript', 'superscript', 'table', 'text-height', 'text-width', 'th', 'th-large', 'th-list', 'underline', 'undo', 'unlink'
  ],
  userinfo:{"avatar":"","name":"游客"},
  user:{"content":"","name":"PIM产品信息管理系统"},
  menuList:[
    {"id":10,"parentId":null,"sort":0,"name":"产品基础信息管理","href":"","icon":"fa-dashboard","children":[
      {"id":12,"parentId":null,"sort":0,"name":"产品分类","href":"/","icon":"fa-align-center","children":[]},
      {"id":12,"parentId":null,"sort":0,"name":"型号信息","href":"/modelmanage","icon":"fa-align-center","children":[]},
      {"id":12,"parentId":null,"sort":0,"name":"故障分类","href":"/faultclassity","icon":"fa-align-center","children":[]},
      {"id":13,"parentId":null,"sort":0,"name":"产品基础信息","href":"/info","icon":"fa-bold","children":[]}]},
    {"id":10,"parentId":null,"sort":0,"name":"数据模版","href":"/5","icon":"fa-circle","children":[
        {"id":12,"parentId":null,"sort":0,"name":"定检记录模版","href":"/examtemp","icon":"fa-eraser","children":[]},
        {"id":12,"parentId":null,"sort":0,"name":"常态记录数据模板","href":"/normality","icon":"fa-eraser","children":[]},
        {"id":12,"parentId":null,"sort":0,"name":"整机环境记录数据模板","href":"/machine","icon":"fa-eraser","children":[]},
      ]},
      {"id":10,"parentId":null,"sort":0,"name":"产品信息管理","href":"/2","icon":"fa-columns","children":[
        {"id":12,"parentId":null,"sort":0,"name":"产品履历信息","href":"/maininfo","icon":"fa-eraser","children":[]},
        {"id":13,"parentId":null,"sort":0,"name":"常态检查记录","href":"/ctjcjl","icon":"fa-header","children":[]},
        {"id":13,"parentId":null,"sort":0,"name":"定检记录","href":"/djjl","icon":"fa-list-alt","children":[]},
        {"id":13,"parentId":null,"sort":0,"name":"整机环境测试","href":"/zjhjcs","icon":"fa-paperclip","children":[]},
        {"id":13,"parentId":null,"sort":0,"name":"试验记录","href":"/syjl","icon":"fa-gg-circle","children":[]},
        {"id":13,"parentId":null,"sort":0,"name":"联式记录","href":"/lsjl","icon":"fa-gratipay","children":[]},
        {"id":13,"parentId":null,"sort":0,"name":"故障案例","href":"/gzal","icon":"fa-google-wallet","children":[]},
        ]},
        {"id":10,"parentId":null,"sort":0,"name":"产品出入库管理","href":"/3","icon":"fa-eraser","children":[
          {"id":12,"parentId":null,"sort":0,"name":"仓库信息","href":"/wareinfo","icon":"fa-eraser","children":[]},
          {"id":13,"parentId":null,"sort":0,"name":"产品入库管理","href":"/warein","icon":"fa-header","children":[]},
          {"id":13,"parentId":null,"sort":0,"name":"产品出库管理","href":"/wareout","icon":"fa-header","children":[]},
        ]},
        {"id":10,"parentId":null,"sort":0,"name":"系统设置","href":"/4","icon":"fa-circle","children":[
          {"id":12,"parentId":null,"sort":0,"name":"用户权限管理","href":"/sysset","icon":"fa-eraser","children":[]},
          {"id":12,"parentId":null,"sort":0,"name":"流程设置","href":"/flowSet","icon":"fa-eraser","children":[]},
        ]},
    {"id":10,"parentId":null,"sort":0,"name":"流程测试","href":"/7","icon":"fa-circle","children":[
        {"id":12,"parentId":null,"sort":0,"name":"测试页面","href":"/flowcontrol","icon":"fa-eraser","children":[]},
      ]},

    ],
  area:[{
    "ProID": 1,
    "name": "北京",
    "ProSort": 1,
    "ProRemark": "直辖市"
  }, {
    "ProID": 2,
    "name": "天津",
    "ProSort": 2,
    "ProRemark": "直辖市"
  }, {
    "ProID": 3,
    "name": "河北",
    "ProSort": 5,
    "ProRemark": "省份"
  }, {
    "ProID": 4,
    "name": "山西",
    "ProSort": 6,
    "ProRemark": "省份"
  }, {
    "ProID": 5,
    "name": "内蒙古",
    "ProSort": 32,
    "ProRemark": "自治区"
  }, {
    "ProID": 6,
    "name": "辽宁",
    "ProSort": 8,
    "ProRemark": "省份"
  }, {
    "ProID": 7,
    "name": "吉林",
    "ProSort": 9,
    "ProRemark": "省份"
  }, {
    "ProID": 8,
    "name": "黑龙江",
    "ProSort": 10,
    "ProRemark": "省份"
  }, {
    "ProID": 9,
    "name": "上海",
    "ProSort": 3,
    "ProRemark": "直辖市"
  }, {
    "ProID": 10,
    "name": "江苏",
    "ProSort": 11,
    "ProRemark": "省份"
  }, {
    "ProID": 11,
    "name": "浙江",
    "ProSort": 12,
    "ProRemark": "省份"
  }, {
    "ProID": 12,
    "name": "安徽",
    "ProSort": 13,
    "ProRemark": "省份"
  }, {
    "ProID": 13,
    "name": "福建",
    "ProSort": 14,
    "ProRemark": "省份"
  }, {
    "ProID": 14,
    "name": "江西",
    "ProSort": 15,
    "ProRemark": "省份"
  }, {
    "ProID": 15,
    "name": "山东",
    "ProSort": 16,
    "ProRemark": "省份"
  }, {
    "ProID": 16,
    "name": "河南",
    "ProSort": 17,
    "ProRemark": "省份"
  }, {
    "ProID": 17,
    "name": "湖北",
    "ProSort": 18,
    "ProRemark": "省份"
  }, {
    "ProID": 18,
    "name": "湖南",
    "ProSort": 19,
    "ProRemark": "省份"
  }, {
    "ProID": 19,
    "name": "广东",
    "ProSort": 20,
    "ProRemark": "省份"
  }, {
    "ProID": 20,
    "name": "海南",
    "ProSort": 24,
    "ProRemark": "省份"
  }, {
    "ProID": 21,
    "name": "广西",
    "ProSort": 28,
    "ProRemark": "自治区"
  }, {
    "ProID": 22,
    "name": "甘肃",
    "ProSort": 21,
    "ProRemark": "省份"
  }, {
    "ProID": 23,
    "name": "陕西",
    "ProSort": 27,
    "ProRemark": "省份"
  }, {
    "ProID": 24,
    "name": "新疆",
    "ProSort": 31,
    "ProRemark": "自治区"
  }, {
    "ProID": 25,
    "name": "青海",
    "ProSort": 26,
    "ProRemark": "省份"
  }, {
    "ProID": 26,
    "name": "宁夏",
    "ProSort": 30,
    "ProRemark": "自治区"
  }, {
    "ProID": 27,
    "name": "重庆",
    "ProSort": 4,
    "ProRemark": "直辖市"
  }, {
    "ProID": 29,
    "name": "贵州",
    "ProSort": 23,
    "ProRemark": "省份"
  }, {
    "ProID": 30,
    "name": "云南",
    "ProSort": 25,
    "ProRemark": "省份"
  }, {
    "ProID": 31,
    "name": "西藏",
    "ProSort": 29,
    "ProRemark": "自治区"
  }, {
    "ProID": 32,
    "name": "台湾",
    "ProSort": 7,
    "ProRemark": "省份"
  }, {
    "ProID": 33,
    "name": "澳门",
    "ProSort": 33,
    "ProRemark": "特别行政区"
  }, {
    "ProID": 34,
    "name": "香港",
    "ProSort": 34,
    "ProRemark": "特别行政区"
  }]

}
