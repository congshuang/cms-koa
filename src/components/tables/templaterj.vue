<template>
  <div class="rj">

    <el-table
      v-loading="dataTree.loading"
      ref="dataTree"
      :data="dataTree.rows"
      tooltip-effect="dark"
      size="mini"
      @cell-click="cellClick"
      style="width: 100%"
      border
      highlight-current-row>
      <el-table-column
        type="index"
       align="center"
        label="序号"
        sortable
        width="50">
      </el-table-column>
      <el-table-column
        prop="softwateName"
        label="软件产品名称"
        min-width="130"
        sortable
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="softwareNumber"
        label="软件产品编号（含版本号）"
        min-width="160"
        sortable
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="operationDate"
        label="软件装载日期"
        min-width="130"
        sortable
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="description"
        label="测评情况"
        min-width="130"
        sortable
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="detectionDescription"
        label="备注"
        min-width="130"
        sortable
        align="center"
        >

      </el-table-column>


    </el-table>
    <el-pagination
      class="pagination"
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
      loadData() {
        this.dataTree.loading = true;
        let obj = {
          pageNo: this.dataTree.pagination.pageNo,
          pageSize: this.dataTree.pagination.pageSize,
          query: {
            productEntityId:this.id
          }
        };
        this.$http.post(api.SYS_Record_LISTS, obj).then((res) => {
          let data = res.data.data.list;
          let len = res.data.data.count;
          this.dataTree.pagination.total = len;
          this.dataTree.rows = data;
          this.dataTree.loading = false;
        }).catch((res) => {
          this.$message.error('请求失败,请检查网络...');
        });
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


</style>
