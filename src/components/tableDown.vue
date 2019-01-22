<template>
  <div class="el-select">
    <el-popover
      ref="popover"
      placement="right"
      v-model="visible"
      visible-arrow="false"
      width="400"
      trigger="focus">
        <el-input placeholder="请输入内容" v-model="searchKey" size="mini" style="margin-bottom:10px;">
          <el-button slot="append" icon="el-icon-search" @click="loadData"></el-button>
        </el-input>
        <el-table :data="datalist"
                  border
                  v-loading="loading"
                  :max-height="option.maxHeight"
                  :style="{ width: parseInt(option.width)+'px'}"
                  tooltip-effect="dark"
                  size="mini"
                  @current-change="currentChange"
                  fit
                  highlight-current-row
        >
          <el-table-column v-for="(col, index) in tableHeader" :key="index"
                           :prop="col.prop"
                           :label="col.label"
                           :sortable="col.sortable"
                           :type="col.type"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :current-page="pageNo"
          :page-size="5"
          @current-change="handleCurrentChange"
          layout="prev, pager,next"
          style="margin-top:10px;"
          :total="total">
        </el-pagination>
    </el-popover>
    <el-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      suffix-icon="el-icon-arrow-down"
      :size="size"
      :disabled="disabled"
      :validate-event="false"
      v-popover:popover
      :style="styleinput">
    </el-input>
  </div>
</template>

<script type="text/babel">
  import merge from 'element-ui/lib/utils/merge';
  import treeter from "../components/treeter"

  const sizeMap = {
    'large': 42,
    'small': 30,
    'mini': 22
  };
  export default {
    mixins: [treeter],
    computed: {},
    props: {
      name: String,
      value: {},
      styleinput: {
        type: String,
        default() {
          return 'background-color: transparent;'
        }
      },
      disabled: Boolean,
      clearable: Boolean,
      size: {
        type: String,
      },

      propNames: {
        type: Object,
        default() {
          return { label: 'label', id: 'id'}
        }
      },
      option: {
        default: function () {
          return {}
        },
        type: Object
      },
      placeholder: {
        type: String,
        default:'请选择'
      }

    },

    data() {
      return {
        pageNo:1,
        visible:false,
        tableHeader: this.option.tableHeader,
        selectedLabel:"",
        currentPlaceholder:"库管员",
        selected:"",
        loading:false,
        datalist:[],
        total:0,
        searchKey:""
      };
    },

    watch: {
      value(val) {
        this.currentPlaceholder = this.placeholder;
        this.setSelected(val);
        this.$emit('change', val);

      },

    },

    methods: {
      handleCurrentChange(val){
        this.pageNo = val;
        this.loadData();
      },
      currentChange(nodeData) {
        this.$emit('input', nodeData[this.propNames.id]);
        this.selectedLabel = nodeData[this.propNames.label];

        this.visible = false;
      },
      setSelected(ids) {

        if (!!ids) {
            this.selected = this.findTableTree(this.datalist, ids, this.propNames.id, this.propNames.label);
            this.selectedLabel = !!this.selected ? this.selected : '';

        } else {
          this.$emit('input', '');
          this.selectedLabel = '';

        }
      },
      // popoverShow(){
      //   this.searchKey = "";
      //   this.loadData();
      // },
      loadData(){
        let obj = {
          pageNo: this.pageNo,
          pageSize: 5,
          query:{
            sreach:this.searchKey
          }
        };
        this.loading = true;
        this.$http.post(this.option.url,obj).then((res) =>{

          this.datalist = res.data.data.list;
          this.total = res.data.data.count;
          this.loading = false;
        }).catch((res) =>{
          this.$message.error('网络出现错误...');
        });
      }
    },
    created() {
      let obj = {
        pageNo: this.pageNo,
        pageSize: 5,
        query:{
          sreach:this.searchKey
        }
      };
      this.loading = true;
      this.$http.post(this.option.url,obj).then((res) =>{
        this.datalist = res.data.data.list;
        this.total = res.data.data.count;
        this.loading = false;
      }).catch((res) =>{
        this.$message.error('网络出现错误...');
      });
    },
    mounted() {
      this.searchKey = "";
      this.loadData();
      this.setSelected(this.value);
      this.$on('setSelected', this.setSelected);
    },
  };
</script>
<style>
  .xing {
    display: block;
    white-space: nowrap;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
