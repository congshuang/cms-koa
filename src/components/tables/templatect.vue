<template>
  <div class="ct">

    <div class="box-title" style="width: 100%;margin-bottom:10px;" v-if="isShowBtn">
      <el-button-group>
        <el-button type="primary" icon="icon iconfont icon-shenhe" size="small" @click="approve" >审 核</el-button>
        <el-button type="primary" icon="icon iconfont icon-add" size="small" @click="toAdd" v-has="`prodetection:normal:save`">新增常态检测记录</el-button>
        <el-button
          size="small"
          type="primary"
          @click.prevent.stop="handlechange2()" icon="icon iconfont icon-edit" v-has="`prodetection:normal:update`">修 改
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click.prevent.stop="handleDelete()" icon="icon iconfont icon-delete" v-has="`prodetection:normal:delete`">删 除
        </el-button>
      </el-button-group>
    </div>
    <el-dialog v-dialogDrag title="选择审核人" :visible.sync="componentFixVisible" width="600px">
      <component is="flow-fix-dialog" :busiDataId="busiDataId" :flowId="flowId" :formData="formList" :flagtag="flagtag"
                 @componentFlowSubmit="componentFixSubmit" @componentFlowClose="componentFixClose" @setBusiDataId="setBusiDataId" v-if="componentFixVisible"
      ></component>
    </el-dialog>
    <el-table
      v-loading="dataTree.loading"
      ref="dataTree"
      :data="dataTree.rows"
      tooltip-effect="dark"
      size="mini"
      style="width: 100%"
      @cell-click="cellClick"
      border
      @selection-change="handleSelectionChange"
      highlight-current-row>
      <el-table-column
        type="selection"
        width="55"
        align="center">
      </el-table-column>
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="occurrenceTime"
        label="产品名称"
        sortable
        min-width="120"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.pimProductEntity?scope.row.pimProductEntity.productName:''}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="entityNumber"
        label="产品编号"
        sortable
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="technicalFileName"
        label="技术文件名称"
        sortable
        min-width="130"
        align="center">
      </el-table-column>
      <el-table-column
        prop="technicalFileCode"
        label="技术文件代号"
        sortable
        min-width="130"
        align="center">
      </el-table-column>
      <el-table-column
        prop="detectionDevice"
        label="主要检测设备"
        min-width="130"
        sortable
        align="center"

      >
      </el-table-column>
      <el-table-column
        prop="operationDate"
        label="检测时间"
        min-width="120"
        sortable
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.operationDate == '1900-01-01 00:00:00'?'******':scope.row.operationDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="摘要信息"
        min-width="120"
        sortable
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.unqualifiedQuantity != '-999999'">有{{scope.row.unqualifiedQuantity}}个不合格项</span>
          <span v-else>******</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态"
        sortable
        min-width="120"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dataStatus == '2'&&scope.row.needAudit == '0'" style="color:#e6a23c;">{{getstate(scope.row.dataOperType)}}  审批中</span>
          <span v-if="scope.row.dataStatus == '2'&&scope.row.needAudit == '1'" style="color:#e6a23c;">{{getstate(scope.row.dataOperType)}}  未审核</span>
          <span v-if="scope.row.dataStatus == '1'" style="color:#67c23a;">审批通过</span>
          <span v-if="scope.row.dataStatus == '3'" style="color:#409EFF;">{{getstate(scope.row.dataOperType)}}  审批未通过</span>
          <span v-if="scope.row.dataStatus == '4'" style="color:#f56c6c;">{{getstate(scope.row.dataOperType)}}  未提交</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="secretRank"
        label="密级"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        label="查看数据"
        min-width="120"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="icon iconfont icon-lookthrough"
            @click.prevent.stop="handlechange(scope.$index, scope.row)">查 看
          </el-button>
        </template>
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
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import flowFixDialog from "../dialog/flowFixDialog";
  import types from '../../store/mutation-types'
  import * as api from '../../api';
  export default {
    name: "ImpPanel",
    props: {
      id: {
        type: String
      },
      isshow:{
        type:Boolean,
        default: true
      },
      keywords:String
    },
    data() {
      return {
        operType:'',
        componentFixVisible:false,
        formList:{},
        busiDataId:['0'],
        tags:1,
        flowId:'',
        flagtag:3,
        flag:"",
        isfall: false,
        isShowBtn: false,
        multipleSelection: [],
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
    computed: {
      ...mapGetters([
        'menuId'
      ])
    },
    components: {
      'flow-fix-dialog': flowFixDialog,
    },
    mounted(){
      this.id == 'all'?this.isShowBtn = true:this.isShowBtn = false
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
      getstate(state){
        if(state == '1'){
          return '新增';
        }else if(state == '2'){
          return '修改';
        }else{
          return '删除';
        }
      },
      componentFixSubmit(){
        this.busiDataId = ['0'];
        this.loadData();
        this.componentFixVisible = false;
      },
      componentFixClose(){
        this.componentFixVisible = false;
      },
      setBusiDataId(busiDataId){
        this.busiDataId = busiDataId;
      },
      handleDelete() {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: "info",
            message: "请选择一个事项..."
          });
          return false
        };
        let row = this.multipleSelection;
        let istrue = this.multipleSelection.some(a => a.dataStatus == '3'||a.dataStatus == '4');
        this.$http.post(api.SYS_applyBefore_checkNeedAudit,{
          busiModelId:this.menuId,
          operType:'delete'
        }).then((res) => {
          let tag = res.data.data.needAudit;
          let flag = tag == '0' ? false : true;
          this.flowId = res.data.data.flowId?res.data.data.flowId:'';
          if (flag&&!istrue) {
            this.flagtag = 3;
            console.log(row)
            this.formList = row;
            this.componentFixVisible = true;
          } else {
            this.$confirm('确定是否删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.post(`${api.pim_prodetection_delete}/${tag}`, row).then((res) => {
                this.loadData();
                if(flag){
                  this.$message({type: 'success', message: '审批未通过或未提交审批的数据已删除,其他状态保留到原来数据!'});
                }else{
                  this.$message({type: 'success', message: '删除成功!'});
                }
              }).catch((res) => {
                this.$message.error('请求失败,请检查网络...');
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
        });
      },
      ...mapMutations({
        setInfoCid: types.SET_INFO_CTID,
        setAppInfo: types.SET_APP_INFO
      }),
      handleSelectionChange(val) {
        this.multipleSelection = val;
        if(!this.isshow){
          this.$emit('childByValueCt',this.multipleSelection);
        }
      },
      //审核
      approve(){
        if(this.multipleSelection.length == 0){
          this.$message({
            type:'info',
            message:"请选择一个事项"
          })
        }else if(this.multipleSelection.length == 1){
          if(this.multipleSelection[0].dataStatus == '2'&&this.multipleSelection[0].needAudit == '1'){
            this.setAppInfo(this.multipleSelection[0]);
            this.$router.push({path:'/flowCt'});
          }else{
            this.$message({
              type:'info',
              message:"只有状态为未审核的才可以审核"
            })
          }
        }else{
          this.$message({
            type:'info',
            message:"不可选择多个事项"
          })
        }
      },
      //新增
      toAdd(){
        this.setInfoCid("");
        this.$router.push({path: '/fixCt'});
      },
      //修改
      handlechange2() {
        let row = this.multipleSelection[0];
        if(this.multipleSelection.length == 0){
          this.$message({
            type:"info",
            message:"请选择一个事项..."
          });
        }else if(this.multipleSelection.length > 1){
          this.$message({
            type:"info",
            message:"仅能选择一条数据..."
          });
        }else{
          this.setInfoCid(this.multipleSelection[0].id);
          this.$router.push({path: '/fixCt'});
        }
      },

      loadData() {
        this.dataTree.loading = true;
        let url = "";
        if(this.isshow){
          url =`${api.prodetection_list}`;
        }else{
          url =`${api.NormalrecordCompared}${this.id}`;
        }
        this.$http.post(url,{
          query: {
            productEntityId: this.id == 'all'?'':this.id,
            keywords: this.keywords
          },
          pageNo: this.dataTree.pagination.pageNo,
          pageSize: this.dataTree.pagination.pageSize
        }).then((res) =>{
          if(this.isshow){
            let data = res.data.data.list;
            let len = res.data.data.count;
            this.dataTree.pagination.total = len;
            this.dataTree.rows = data;
          }else{
            let data = res.data.data;
            this.dataTree.rows = data;
          }
          this.$emit('claerKey');
          this.dataTree.loading = false;
        }).catch((res) =>{
          this.dataTree.loading = false;
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
      loadTableData(row) {
        this.setAppInfo(row);
        this.$router.push({path: '/ctTable'});
      },
      handlechange(index, rows) {
        this.loadTableData(rows);
      }
    },
    watch:{
      keywords(newValue,oldValue){
        this.loadData();
      }
    },
    created() {

      this.setInfoCid('');
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


</style>
