<template>
  <div class="fj">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="附属件" name="first">
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
            label="部组件名称"
            min-width="130"
            align="left"
            >
            <template slot-scope="scope">
              <div :class="{'pad-mini':scope.row.isIndex != -1}">
                <el-tag v-if="scope.row.isIndex == -1" size="mini">现</el-tag>
                <el-tag v-if="scope.row.isIndex != -1" type="info" size="mini">更</el-tag>
                <span>{{scope.row.prodName?scope.row.prodName:scope.row.attachmentName}}</span>
              </div>

            </template>
          </el-table-column>

          <el-table-column
            label="单位"
            min-width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.productInfo">{{scope.row.productInfo.productUnit?scope.row.productInfo.productUnit:''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="entityNum"
            label="部组件编号"
            min-width="140"
            align="center"
           >
            <template slot-scope="scope">
              <span >{{scope.row.entityNum?scope.row.entityNum:scope.row.attachmentNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用途"
            min-width="120"
            align="center"
           >
            <template slot-scope="scope">
              <span v-if="scope.row.productInfo">{{scope.row.productInfo.purpose?scope.row.productInfo.purpose:''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="备注"
            min-width="120"
            align="center"
           >
          </el-table-column>
          <el-table-column
            label="经手人"
            min-width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.ownerUsername?scope.row.ownerUsername:''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="120"
            label="所属日期"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.operationDate?scope.row.operationDate:''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="prodName"
            label="所属产品"
            min-width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.productName?scope.row.productName:''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-button size="mini" @click="changeShow(scope.$index,scope.row.prodId)" v-if="scope.row.isTrue != 2">{{scope.row.isTrue == 0?'隐藏':'显示'}}
                <i class="el-icon-arrow-up" style="margin-left: 5px;" v-if="scope.row.isTrue == 0"></i>
                <i class="el-icon-arrow-down" style="margin-left: 5px;" v-else></i>
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="dataTree.pagination.pageNo"
          :page-sizes="[5, 10, 20]"
          :page-size="dataTree.pagination.pageSize"
          background layout="prev, pager, next, jumper, total"
          :total="dataTree.pagination.total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="原附属件" name="second">
        <el-table
          v-loading="dataTree1.loading"
          ref="dataTree"
          @cell-click="cellClick"
          :data="dataTree1.rows"
          tooltip-effect="dark"
          size="mini"
          style="width: 100%"
          border
          highlight-current-row>
          <el-table-column
            label="部组件名称"

            align="left"
          >
            <template slot-scope="scope">
              <div :class="{'pad-mini':scope.row.isIndex != -1}">
                <el-tag v-if="scope.row.isIndex == -1" size="mini">原</el-tag>
                <el-tag v-if="scope.row.isIndex != -1" type="info" size="mini">更</el-tag>
                <span>{{scope.row.prodName?scope.row.prodName:scope.row.attachmentName}}</span>
              </div>

            </template>
          </el-table-column>

          <el-table-column
            label="单位"
            min-width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.productInfo">{{scope.row.productInfo.productUnit?scope.row.productInfo.productUnit:''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="entityNum"
            label="部组件编号"
            min-width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span >{{scope.row.entityNum?scope.row.entityNum:scope.row.attachmentNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用途"
            min-width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.productInfo">{{scope.row.productInfo.purpose?scope.row.productInfo.purpose:''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="备注"
            min-width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            min-width="120"
            label="经手人"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.ownerUsername?scope.row.ownerUsername:''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="120"
            label="所属日期"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.operationDate?scope.row.operationDate:''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="120"
            prop="prodName"
            label="所属产品"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.productName?scope.row.productName:''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="120"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button size="mini" @click="changeShow1(scope.$index,scope.row.prodId)" v-if="scope.row.isTrue != 2">{{scope.row.isTrue == 0?'隐藏':'显示'}}
                <i class="el-icon-arrow-up" style="margin-left: 5px;" v-if="scope.row.isTrue == 0"></i>
                <i class="el-icon-arrow-down" style="margin-left: 5px;" v-else></i>
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="dataTree1.pagination.pageNo"
          :page-sizes="[5, 10, 20]"
          :page-size="dataTree1.pagination.pageSize"
          background layout="prev, pager, next, jumper, total"
          :total="dataTree1.pagination.total">
        </el-pagination>
      </el-tab-pane>


    </el-tabs>


  </div>
</template>
<script type="text/javascript">
  import defaultValue from '../../services/mock.data'
  import * as api from '../../api';

  export default {
    name: "ImpPanel",
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        activeName: "first",
        dataTree: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 6,
            parentId: 0
          },
          rows: [],
          loading: true
        },
        dataTree1: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 6,
            parentId: 0
          },
          rows: [],
          loading: true
        },
      }
    },
    methods: {

      changeShow(index,id){
        let is = this.dataTree.rows[index].isTrue == 0?false:true;
        this.dataTree.rows[index].isTrue = is?0:1;
        if(is){

          this.$http.post(`${api.pim_pimBusiFlow_replacementRecordPage}`,{
            pageNo:1,
            pageSize:10,
            query:{
              attachmentId:id
            }
          }).then((res) =>{
            console.log(res);
            res.data.data.list.map((dataList,idx) =>{
              let list = Object.assign({isTrue:2,isIndex:index},dataList);
              this.dataTree.rows.splice(index+1+idx,0,list);
            });
          });
        }else{
          let list = Object.assign([],this.dataTree.rows);
          let end = 0;
          let start = 0;
          this.dataTree.rows.forEach((data,idx) =>{
            if(data.isIndex == index){
              end++;
              if(end == 1){
                start = idx;
              }
            }
            if(idx+1 == this.dataTree.rows.length){
              list.splice(start,end);
              this.dataTree.rows = list;
            }
          })
        }
      },
      changeShow1(index,id){
        let is = this.dataTree1.rows[index].isTrue == 0?false:true;
        this.dataTree1.rows[index].isTrue = is?0:1;
        if(is){

          this.$http.post(`${api.pim_pimBusiFlow_replacementRecordPage}`,{
            pageNo:1,
            pageSize:10,
            query:{
              attachmentId:id
            }
          }).then((res) =>{

            res.data.data.list.map((dataList,idx) =>{
              let list = Object.assign({isTrue:2,isIndex:index},dataList);
              this.dataTree1.rows.splice(index+1+idx,0,list);
            });
          });
        }else{
          let list = Object.assign([],this.dataTree1.rows);
          let end = 0;
          let start = 0;
          this.dataTree1.rows.forEach((data,idx) =>{
            if(data.isIndex == index){
              end++;
              if(end == 1){
                start = idx;
              }
            }
            if(idx+1 == this.dataTree1.rows.length){
              list.splice(start,end);
              this.dataTree1.rows = list;
            }
          })
        }
      },
      cellClick(row, column, cell, event){
        let that = event.srcElement;
        if($(that).css("white-space") == 'normal'){
          $(that).css({"white-space":"nowrap"});
        }else{
          $(that).css({"white-space":"normal"});
        }
      },
      handleClick(tab, event) {
        switch (tab.name) {
          case 'first':
            this.loadData();
            break;
          default:
            this.loadData1();
            break;
        }
      },
      loadData() {
        this.dataTree.loading = true;
        this.$http.post(`${api.pim_pimBusiFlow_productAttachments}`,{
          pageNo:this.dataTree.pagination.pageNo,
          pageSize:this.dataTree.pagination.pageSize,
          query:{
            prodId:this.id
          }
        }).then((res) =>{
          console.log('res',res);
          let data = res.data.data.list;
          let len = res.data.data.count;
          this.dataTree.pagination.total = len;
          this.dataTree.rows = data.map((dataList,index) =>{
            let list = Object.assign({isTrue:1,isIndex:-1},dataList);
            return list;
          });
          this.dataTree.loading = false;
        }).catch((res) =>{
          this.dataTree.loading = false;
        });

      },
      loadData1() {

        this.dataTree1.loading = true;
        this.$http.post(`${api.pim_pimBusiFlow_prodAttachmentsBefore}`,{
          pageNo:this.dataTree1.pagination.pageNo,
          pageSize:this.dataTree1.pagination.pageSize,
          query:{
            prodId:this.id
          }
        }).then((res) =>{
          console.log('res',res);
          let data = res.data.data.list;
          let len = res.data.data.count;
          this.dataTree1.pagination.total = len;
          this.dataTree1.rows = data.map((dataList,index) =>{
            let list = Object.assign({isTrue:1,isIndex:-1},dataList);
            return list;
          });
          this.dataTree1.loading = false;
        }).catch((res) =>{
          this.dataTree1.loading = false;
        });
      },
      handleSizeChange(val) {
        this.dataTree.pagination.pageSize = val;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.dataTree.pagination.pageNo = val;
        this.loadData();
      },
      handleSizeChange1(val) {
        this.dataTree1.pagination.pageSize = val;
        this.loadData1();
      },
      handleCurrentChange1(val) {
        this.dataTree1.pagination.pageNo = val;
        this.loadData1();
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

  .el-table .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pad-mini{
    padding-left: 25px;
  }
</style>
