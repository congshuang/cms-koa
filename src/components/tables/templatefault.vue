<template>
  <div class="fault">
    <div class="box-title" style="width: 100%;margin-bottom:10px;" v-if="isShowBtn">
      <el-button-group>
        <el-button type="primary" @click="loadTo" size="mini" icon="icon iconfont icon-add" v-has="`product:fault:save`">
          添加故障案例
        </el-button>
        <el-button type="primary" @click="loadTos" size="mini" icon="icon iconfont icon-add" v-has="`product:fault:saveSaled`">
          添加售后故障案例
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click.prevent.stop="handlechange()" icon="icon iconfont icon-edit" v-has="`product:fault:update`">修 改
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click.prevent.stop="handleDelete()" icon="icon iconfont icon-delete" v-has="`product:fault:delete`">删 除
        </el-button>
      </el-button-group>
    </div>
    <el-table
      v-loading="dataTree.loading"
      ref="dataTree"
      :data="dataTree.rows"
      tooltip-effect="dark"
      size="mini"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      @cell-click="cellClick"
      border
      highlight-current-row>
      <el-table-column
        type="selection"
        width="55"
        align="center">
      </el-table-column>
      <el-table-column
        prop="occurrenceTime"
        label="产品名称"
        sortable
        min-width="120"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.pimProductEntityExt?scope.row.pimProductEntityExt.productName:''}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="occurrenceTime"
        label="发生时间"
        sortable
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        label="故障类别"
        sortable
        min-width="120"
        align="center">
        <template slot-scope="scope">
          <span>{{setlist(scope.row.itemList)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="故障名称"
        sortable
        min-width="120"
        align="center">
        <template slot-scope="scope">
          <span>{{setlistname(scope.row.itemList)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="occurrenceContext"
        label="故障发生环节"
        sortable
        min-width="130"
        align="center"

      >
      </el-table-column>
      <el-table-column
        label="是否售后发生故障"
        align="center"
        min-width="160"

      >
        <template slot-scope="scope">
          <span v-if="scope.row.saled == '1'" style="color: green;">是</span>
          <span v-else style="color: red;">否</span>

        </template>
      </el-table-column>
      <el-table-column
        prop="secretRank"
        label="密级"
        align="center"
        sortable
        min-width="100">
      </el-table-column>
      <el-table-column
        label="查看"
        align="center"
        min-width="120"

      >
        <template slot-scope="scope">
          <el-button type="text" @click="rowDblclick(scope.row)" size="mini" icon="icon iconfont icon-lookthrough">查看</el-button>

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
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import types from '../../store/mutation-types'
  import * as api from "../../api"
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
        isShowBtn: false,
        isfall: false,
        dataTree: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 6,
            parentId: 0
          },
          rows: [],
          loading: true,
          multipleSelection:[]
        },

      }
    },
    components: {},
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDelete(){
        // console.log(this.multipleSelection);
        let selection = this.multipleSelection.map((data) =>{
          let obj = {
            orderId:data.orderId,
            saled:data.saled
          }
          return obj;
        });

          this.$http.post(api.pimProductFaultOrder_delete,selection).then((res) => {
            console.log(res);
            if(res.data.code == 200){
              this.$message({
                type:'success',
                message:res.data.message
              })
              this.loadData();
            }else{
              this.$message({
                type:'info',
                message:res.data.message
              })
            }
          })
      },
      handlechange() {
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
          this.setInfoCid(this.multipleSelection[0]);
          let path = this.multipleSelection[0].saled == '1'?'/faultShInfo':'faultInfo';
          this.$router.push({path: path,query:{isShow:true}});
        }

      },
      rowDblclick(row){
        this.setInfoCid(row);
        let path = row.saled == '1'?'/faultShInfo':'/faultInfo';
        this.$router.push({path: path,query:{isShow:false}});
      },
      setlistname(mul){
        if(Array.isArray(mul)){
          return mul.map((data) =>{
            return data.faultName;
          }).join(',');
        }
        return "";
      },setlist(mul){
        if(Array.isArray(mul)){
          return mul.map((data) =>{
            return data.faultCategoryName;
          }).join(',');
        }
        return "";
      },
      cellClick(row, column, cell, event){

        let that = event.srcElement;
        if($(that).css("white-space") == 'normal'){
          $(that).css({"white-space":"nowrap"});
        }else{
          $(that).css({"white-space":"normal"});
        }
      },
      ...mapMutations({
        setInfoCid: types.SET_CT_DATA
      }),
      loadData() {

        this.dataTree.loading = true;
        let url = "";
        if(this.isshow){
          url =`${api.SYS_TREE_orderInfos}`;
        }else{
          url =`${api.FaultCompared}${this.id}`;
        }
        this.$http.post(url, {
          pageNo: this.dataTree.pagination.pageNo,
          pageSize: this.dataTree.pagination.pageSize,
          query: {
            productEntityId:this.id=='all'?'':this.id,
            keywords:this.keywords
          }
        }).then((res) => {
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
      loadTo() {
        this.$router.push({path: '/faultInfo',query:{isShow:true}});
      },
      loadTos() {
        this.$router.push({path: '/faultShInfo',query:{isShow:true}});
      },
    },
    watch:{
      keywords(newValue,oldValue){
        this.loadData();
      }
    },
    mounted(){
      this.id == 'all'?this.isShowBtn = true:this.isShowBtn = false
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
