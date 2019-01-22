<template>
  <div class="cr">

    <el-table
      v-loading="dataTree.loading"
      ref="dataTree"
      :data="dataTree.rows"
      tooltip-effect="dark"
      size="mini"
      style="width: 100%"
      border

      @cell-click="cellClick"
      :row-class-name="tableRowClassName"
      highlight-current-row>
      <el-table-column
        type="index"
       align="center"
        label="序号"
        sortable
        width="50">
      </el-table-column>
      <el-table-column
        prop="orderNumber"
        label="单据编号"
        sortable
        align="center"
       >
      </el-table-column>
      <el-table-column
        label="出入库类型"
        sortable
        align="center"
        >
        <template slot-scope="scope">
          <span>
            {{scope.row.type == '1'?'入库':'出库'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="warehouseName"
        label="仓库"
        sortable
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="inTime"
        label="出入库日期"
        sortable
        align="center"
        >

      </el-table-column>
      <el-table-column
        prop="ownerName"
        label="经手人"
        sortable
        align="center"
        >

      </el-table-column>
      <el-table-column
        prop="outPurpose"
        label="出库目的地"
        sortable
        align="center"
      >
      </el-table-column>

    </el-table>
    <el-pagination
      class="pagination"
      v-if="isshow"
      @size-change="handleSizeChangePtgx"
      @current-change="handleCurrentChangePtgx"
      :current-page="dataTree.pagination.pageNo"
      :page-sizes="[5, 10, 20]"
      :page-size="dataTree.pagination.pageSize"
      background layout="prev, pager, next, jumper, total"
      :total="dataTree.pagination.total">
    </el-pagination>


  </div>
</template>
<script type="text/javascript">
  import defaultValue from '../../services/mock.data'
  import * as api from '../../api'

  export default {
    name: "ImpPanel",
    props: {
      id: {
        type: String
      },
      isshow:{
        type:Boolean,
        default: true
      }
    },
    data() {
      return {
        dataTree: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 6,
            parentId: 0
          },
          rows: [],
          loading: true
        }
      }
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
      tableRowClassName({row, rowIndex}) {
        if (row.type == '1') {
          return 'warning-row';
        } else if (row.type == '2') {
          return 'success-row';
        }
        return '';
      },
      loadData() {
        this.dataTree.loading = true;
        let url = "";
        let obj = {};
        if(this.isshow){
          url =`${api.pim_export_outInWarehouseRecord}`;
          obj = {
            pageNo:this.dataTree.pagination.pageNo,
            pageSize:this.dataTree.pagination.pageSize,
            query:{
              id:this.id
            }
          }
        }else{
          url =`${api.outInWarehouseRecordList}`;
          obj = {
            id:this.id
          }
        }
        this.$http.post(url,obj).then((res) =>{
          if(this.isshow){
            let data = res.data.data.list;
            let len = res.data.data.count;
            this.dataTree.pagination.total = len;
            this.dataTree.rows = data;
          }else{
            let data = res.data.data;
            this.dataTree.rows = data;
          }

          this.dataTree.loading = false;
        }).catch((res) =>{

        })
      },
      handleSizeChangePtgx(val) {
        this.dataTree.pagination.pageSize = val;
        this.loadData();
      },
      handleCurrentChangePtgx(val) {
        this.dataTree.pagination.pageNo = val;
        this.loadData();
      },
      handlechange(index, rows) {

      }
    },
    created() {
      if (this.id == "all") {
        this.loadData();
      } else {
        this.loadData();
      }
    }
  }
</script>
<style lang="scss">

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
