<template>
  <div class="tls">
    <table class="top borders">
      <tr>
        <th>联试地点:</th>
        <th>
          {{currentRow.testLocation}}
        </th>
        <th>联试型号:</th>
        <th>{{currentRow.testType}}</th>
        <th>联试环境温湿度:</th>
        <th>{{currentRow.temperatureAndHumidity}}</th>
      </tr>
      <tr>
        <th>联试时间:</th>
        <th>
          {{currentRow.testTime}}
        </th>
        <th>联试参加单位:</th>
        <th>{{currentRow.participateUnit}}</th>
        <th>包装箱号:</th>
        <th>{{currentRow.packingBoxNumber}}</th>
      </tr>
      <tr>
        <th>DT编号:</th>
        <th>{{currentRow.dtNumber}}</th>
        <th>联试记录人:</th>
        <th>{{currentRow.code}}</th>
        <th>结论:</th>
        <th>{{currentRow.testResult}}</th>

      </tr>
    </table>

    <el-table
      v-loading="dataTree.loading"
      ref="dataTree"
      :data="dataTree.rows"
      tooltip-effect="dark"
      size="mini"
      style="width: 100%;margin-top: 10px"
      @cell-click="cellClick"
      border
      highlight-current-row>
      <el-table-column
        type="selection"
        width="55"
        align="center">
      </el-table-column>
      <el-table-column
        prop="entityNumber"
        label="产品编号"
        min-width="120"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        min-width="120"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="productCode"
        label="产品代号"
        min-width="120"
        sortable
        align="center">
      </el-table-column>

      <el-table-column
        prop="isQualified"
        label="是否合格"
        min-width="120"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="unqualifiedNumber"
        label="不合格单号"
        min-width="120"
        sortable
        align="center">
      </el-table-column>

    </el-table>


  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import flowLsDialog from "../dialog/flowLsDialog";
  import types from '../../store/mutation-types'
  import * as api from '../../api';
  export default {
    name: "tls",
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        currentRow:{},
        dataTree: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 6,
            parentId: 0
          },
          rows: [],
          loading: true,
        },
      }
    },
    components: {
    },
    mounted(){
      this.id == 'all'?this.isShowBtn = true:this.isShowBtn = false
    },
    computed: {
      ...mapGetters([
        'menuId'
      ])
    },
    methods: {
      cellClick(row, column, cell, event){
        let that = event.srcElement;
        if($(that).css("white-space") == 'normal'){
          $(that).css({"white-space":"nowrap"});
        }else{
          $(that).css({"white-space":"normal"});
        }
      },
      loadData(){
        this.dataTree.loading = true;
        this.$http.get(`${api.JointTestfindById}${this.id}`).then((res) =>{
          console.log('常态11111检测',res);
          let datat = res.data.data;
          this.currentRow.code = datat.recorder.map((data) =>{
            return data.ownerUserName;
          }).join(',');
          this.currentRow.testLocation = datat.testLocation;
          this.currentRow.testType = datat.testType;
          this.currentRow.temperatureAndHumidity = datat.temperatureAndHumidity;
          this.currentRow.dtNumber = datat.dtNumber;
          this.currentRow.packingBoxNumber = datat.packingBoxNumber;
          this.currentRow.testTime = datat.testTime;
          this.currentRow.participateUnit = datat.participateUnit;
          this.currentRow.testResult = datat.testResult;
          // let data = res.data.data.list;
          // this.dataTree.rows = data;
          // this.dataTree.loading = false;
        }).catch((res) =>{
          this.dataTree.loading = false;
        })
        this.$http.get(`${api.JointlistById}${this.id}`).then((res) =>{
          console.log('常态2222检测',res);
          let data = res.data.data;
          this.dataTree.rows = data;
          this.dataTree.loading = false;
        }).catch((res) =>{
          this.dataTree.loading = false;
        })
      }
    },
    created() {
      if (this.id == "all") {
        this.loadData();
        this.isfall = true;
      } else {
        this.loadData();
        this.isfall = false;
      }
    }
  }
</script>
<style lang="scss">

  .tls table th {
    border-top: 1px #eee solid;
    border-right: 1px #eee solid;
    height: 30px;
    font-size: 13px;
    font-weight: normal;
  }
  .borders {
    border-left: 1px #eee solid;
    border-bottom: 1px #eee solid;
    margin-bottom: 10px;
  }
  table {
    border-spacing: 0px;
    width: 100%;
  }
  .tls .borders tr th:nth-child(odd) {
    width: 12%;
    background-color: #f9f9f9;
  }

  .tls .borders tr th:nth-child(even) {
    width: 19%;
    padding: 0px;
  }
</style>



