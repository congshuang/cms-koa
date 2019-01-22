<template>
  <div class="dj">

    <div class="box-title" style="width: 100%;" v-if="isShowBtn">
      <el-button-group>
        <el-button type="primary" icon="icon iconfont icon-shenhe" size="small" @click="approve">审 核</el-button>
        <el-button type="primary" icon="icon iconfont icon-add" size="small" @click="toAdd" v-has="`product:jointTest:save`">新增联式记录</el-button>
        <el-button
          size="small"
          type="primary"
          @click.prevent.stop="handlechange2()" icon="icon iconfont icon-edit" v-has="`product:jointTest:update`">修 改
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click.prevent.stop="handleDelete()" icon="icon iconfont icon-delete" v-has="`product:jointTest:delete`">删 除
        </el-button>
      </el-button-group>
    </div>
    <el-dialog v-dialogDrag title="选择审核人" :visible.sync="componentFixVisible" width="600px">
      <component is="flow-lstwo-dialog" :busiDataId="busiDataId" :flowId="flowId" :formData="formList" :flagtag="flagtag"
                 @componentFlowSubmit="componentFixSubmit" @componentFlowClose="componentFixClose"
                 @setBusiDataId="setBusiDataId" v-if="componentFixVisible"
      ></component>
    </el-dialog>
    <el-table
      v-loading="dataTree.loading"
      ref="dataTree"
      :data="dataTree.rows"
      tooltip-effect="dark"
      size="mini"
      style="width: 100%;margin-top: 10px"
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
        prop="testPurpose"
        label="联试目的"
        min-width="120"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="testAccording"
        label="联试依据"
        min-width="120"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="participateUnit"
        label="联试参加单位"
        min-width="120"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="testType"
        label="联试型号"
        min-width="120"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="testLocation"
        label="联试地点"
        min-width="120"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="testTime"
        label="联试时间"
        min-width="120"
        sortable
        align="center">
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
        align="center"
      >
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
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import flowLsTwoDialog from "../dialog/flowLsTwoDialog";
  import types from '../../store/mutation-types'
  import * as api from '../../api';
  export default {
    name: "ImpPanel",
    props: {
      id: {
        type: String
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
    components: {
      'flow-lstwo-dialog': flowLsTwoDialog,
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
      ...mapMutations({
        setInfoDJid: types.SET_INFO_DJID,
        setAppInfo: types.SET_APP_INFO
      }),
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
            this.$router.push({path:'/flowLstwo'});
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
        this.setInfoDJid('');
        this.$router.push({path: '/fixLstwo'});
      },
      //修改
      handlechange2() {
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
          this.setInfoDJid(this.multipleSelection[0].id);
          this.$router.push({path: '/fixLstwo'});
        }

      },
      //删除
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
            this.formList = row;
            this.componentFixVisible = true;
          } else {
            this.$confirm('确定是否删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.post(`${api.pimJointTestdelete}/${tag}`, row).then((res) => {
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
      loadData() {
        this.dataTree.loading = true;
        this.$http.post(`${api.pimJointTest}`,{
          query: {
            keywords: this.keywords
          },
          pageNo: this.dataTree.pagination.pageNo,
          pageSize: this.dataTree.pagination.pageSize
        }).then((res) =>{
          let data = res.data.data.list;
          let len = res.data.data.count;
          this.dataTree.pagination.total = len;
          this.dataTree.rows = data;
          this.dataTree.loading = false;
          this.$emit('claerKey');
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
      handlechange(index, rows) {
        this.setInfoDJid(rows.id);
        this.$router.push({path: '/tableLstwo'});
      }
    },
    watch:{
      keywords(newValue,oldValue){
        this.loadData();
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


</style>



