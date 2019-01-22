<template>
  <div class="box" style="width:100%;height:100%;">
    <div class="tableheader">
      <div>常态检测记录数据</div>
      <div @click="close">
        <i class="icon iconfont icon-quxiao"></i>
      </div>
    </div>
    <div class="tablecontent">
      <el-scrollbar tag="div" wrapClass="content-scrollbar" style="height:100%;" id="wrapper">
        <el-card>
          <div slot="header" class="clearfix">
            <i class="fa fa-table"></i>
            {{entryData.productName?entryData.productName:''}} / {{entryData.productCode?entryData.productCode:''}}
          </div>
          <table class="top borders" style="margin-top:20px;">

            <tr>
              <th>产品编号:</th>
              <th style="color:#696969;">{{entryData.entityNumber}}</th>
              <th>所属型号:</th>
              <th style="color:#696969;">{{getList(entryData.pimProductTypes)}}</th>
              <th>试验标准版本号:</th>
              <th style="color:#696969;">{{entry.standardVersionNumber}}</th>

            </tr>
            <tr>
              <th>产品名称:</th>
              <th style="color:#696969;">{{entryData.productName}}</th>
              <th>产品代号:</th>
              <th style="color:#696969;">{{entryData.productCode}}</th>
              <th>产品图号:</th>
              <th style="color:#696969;">{{entryData.graphNumber}}</th>

            </tr>
            <tr>
              <th>技术文件名称:</th>
              <th style="color:#696969;">{{entry.technicalFileName}}</th>
              <th>技术文件代号:</th>
              <th style="color:#696969;">{{entry.technicalFileCode}}</th>
              <th>主要检测设备:</th>
              <th style="color:#696969;">{{entry.detectionDevice}}</th>
            </tr>
            <tr>
              <th>试验人员:</th>
              <th style="color:#696969;">{{names}}</th>
              <th>湿度:</th>
              <th style="color:#696969;">{{entry.humidity}}</th>
              <th>试验地点:</th>
              <th style="color:#696969;">{{entry.detectionLocation}}</th>
            <tr>
            <tr>
              <th>检测时间:</th>
              <th style="color:#696969;">
                {{entry.operationDate == '1900-01-01 00:00:00'?'******':entry.operationDate}}
              </th>
              <th>密级等级:</th>
              <th style="color:#696969;">{{entry.secretRank}}</th>
              <th>气压:</th>
              <th style="color:#696969;">{{entry.airPressure}}</th>
            </tr>
            <tr>
              <th>是否返厂标定:</th>
              <th style="color:#696969;">{{entry.isReturnCalibration==1?'是':'否'}}</th>
              <th>湿度:</th>
              <th style="color:#696969;">{{entry.humidity}}</th>
              <th></th>
              <th></th>
            </tr>
          </table>
        </el-card>
        <el-table
          ref="dataTree"
          v-loading="dataTree.loading"
          :data="dataTree.rows"
          tooltip-effect="dark"
          size="mini"
          @cell-click="cellClick"
          style="width: 100%;margin-top:20px;margin-bottom: 20px;"
          border
          highlight-current-row>
          <el-table-column
            prop="categoryName"
            label="检测项目分类名称"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="name"
            label="检测项目名称"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="spec"
            label="规格"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="unit"
            label="单位"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="minimun"
            label="下限"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="statisticType"
            label="统计类型"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="maximun"
            label="上限"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="constraintDesc"
            label="约束条件"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="detectionEffect"
            label="检验特效"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="description"
            label="备注"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="detectionData"
            label="实测数据"
            align="center"
          >
          </el-table-column>

          <el-table-column
            label="是否合格"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.isQualified == 0" style="color: red;">不合格</span>
              <span v-if="scope.row.isQualified == 1" style="color: green;">合格</span>
              <span v-if="scope.row.isQualified == -999999">******</span>
            </template>
          </el-table-column>
        </el-table>
        </el-scrollbar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import * as api from '../../api';

  export default {
    name: "ImpPanel",
    props: {},
    data() {
      return {
        //假数据
        dataTree: {
          rows: [],
          loading: false,
        },
        names:'',
        entryData: {},
        entry: {}
      }
    },
    computed: {
      ...mapGetters([
        'appinfo',
      ]),
    },
    methods: {
      //http请求
      cellClick(row, column, cell, event){
        let that = event.srcElement;
        if($(that).css("white-space") == 'normal'){
          $(that).css({"white-space":"nowrap"});
        }else{
          $(that).css({"white-space":"normal"});
        }
      },
      close() {
        this.$router.back(-1);
      },
      getList(mul) {
        let arr = [];
        if (Array.isArray(mul)) {
          mul.forEach((data, index) => {
            arr.push(data.typeName);
          });
        }
        return arr.join(",");
      }
    },
    mounted() {

    },
    created() {

      if (this.appinfo.busiDataId) {
        this.$http.get(`${api.prodetection_itemInfo}${this.appinfo.busiDataId}`).then((res) => {
          if (!res.data.data) {
            this.$message.error(res.data.message);
            this.$router.push({path: '/ctjcjl'});
            return false
          }
          let data = res.data.data;

          this.entryData = data.pimProductEntity;
          this.entry = data;
          let ownerList = res.data.data.ownerList;

          this.names = ownerList.map((data) => {
            return data.ownerUserName;
          }).join(',');
          this.dataTree.rows = data.pimNormalDetectionItemList;
          this.dataTree.loading = false;

        });
      } else {
        this.$message({
          type: 'info',
          message: '无相应的属性'
        });
        this.$router.push({path: '/ctjcjl'});
      }
    }
  }
</script>
<style lang="scss">
  .box table th {
    text-align: center;
  }

  .box th {
    color: #303133;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.5;
  }
  .box .borders tr th:nth-child(odd) {
    width: 12%;
    padding-left: 5px;
    background-color: #f9f9f9;
  }
  .box .borders tr th:nth-child(even) {
    width: 19%;
  }
  .borders {
    border-left: 1px #eee solid;
    border-bottom: 1px #eee solid;
  }

  .box table th {
    border-top: 1px #eee solid;
    border-right: 1px #eee solid;
    height: 30px;
    input {
      width: 100%;
      border: none;
      outline: none;
      color: #696969;
      font-size: 0.9rem;
      font-weight: 400;
      line-height: 1.5;
      text-align: center;
    }
  }

  table {
    border-spacing: 0px;
    width: 100%;
  }
  .clearfix{
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .tableheader {
    height: 50px;
    width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    position: fixed;
    top: 0px;
    left: 0px;
    font-size: 20px;
    color: #fff;
    div {
      padding-left: 20px;
      padding-right: 20px;
    }

  }

  body {
    margin: 0px;
  }

  .tablecontent {
    width: 100%;
    height: 100%;
    padding-top: 50px;
    #wrapper {
      width: 100%;
      height: 100%;
      padding: 20px;

    }
  }

</style>
