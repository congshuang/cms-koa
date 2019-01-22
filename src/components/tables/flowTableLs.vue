<template>
  <div class="ls">
    <table class="top borders head">
      <tr>
        <th colspan="8">一、系统联试基本情况</th>
      </tr>
      <tr>
        <th><span style="color:red;">*</span>联试地点:</th>
        <th>
          {{formData.testLocation}}
        </th>
        <th><span style="color:red;">*</span>联试记录人:</th>
        <th>
          {{formData.code}}
        </th>
        <th><span style="color:red;">*</span>联试时间:</th>
        <th>
          {{formData.testTime}}
        </th>
        <th>DT编号:</th>
        <th>
          {{formData.dtNumber}}
        </th>
      </tr>
      <tr>
        <th>包装箱号:</th>
        <th>
          {{formData.packingBoxNumber}}
        </th>
        <th>联试型号:</th>
        <th>
          {{formData.testType}}
        </th>
        <th>联试环境温湿度:</th>
        <th>
          {{formData.temperatureAndHumidity}}
        </th>
        <th>联试参加单位:</th>
        <th>
          {{formData.participateUnit}}
        </th>
      </tr>
      <tr>
        <th>结论:</th>
        <th colspan="7">
          {{formData.testResult}}
        </th>

      </tr>
    </table>
    <table class="top borders other" style="margin-top: 20px;">
      <tr>
        <th colspan="6">二、D上组件配套表</th>
      </tr>
      <tr>
        <th>序号</th>
        <th>产品编号</th>
        <th>产品名称</th>
        <th>产品代号</th>
        <th>是否合格</th>
        <th>不合格单号</th>
      </tr>
      <tr v-for="(it,index) in pimEntityRegularTest.dataList">
        <th>
          <span>{{index+1}}</span>
        </th>
        <th>
          <span>{{it.entityNumber}}</span>
        </th>
        <th>{{it.productName}}</th>
        <th>{{it.productCode}}</th>
        <th>
          {{it.isQualified == 1?"合格":"不合格"}}
        </th>
        <th>
          {{it.unqualifiedNumber}}
        </th>
      </tr>
      <tr>
        <th>备注</th>
        <th colspan="5">
          {{pimEntityRegularTest.remarks}}
        </th>
      </tr>
      <tr>
        <th>结论</th>
        <th colspan="5">
          {{pimEntityRegularTest.results}}
        </th>
      </tr>
    </table>
    <table class="top borders other" style="margin-top: 20px;">
      <tr>
        <th colspan="4">三、装备质量检测</th>
      </tr>
      <tr>
        <th>序号</th>
        <th>检查项目</th>
        <th>技术要求</th>
        <th>检查结果</th>

      </tr>
      <tr v-for="(it,index) in pimEquipmentQualityInspecti.dataList">
        <th>
          <span>{{index+1}}</span>

        </th>
        <th>
          {{it.inspectionProject}}
        </th>
        <th>
          {{it.technicalRequirements}}
        </th>
        <th>
          {{it.inspectionResults}}
        </th>
      </tr>
      <tr>
        <th>备注</th>
        <th colspan="3">
          {{pimEquipmentQualityInspecti.remarks}}
        </th>
      </tr>
      <tr>
        <th>结论</th>
        <th colspan="3">
          {{pimEquipmentQualityInspecti.results}}
        </th>
      </tr>
    </table>
    <table class="top borders other" style="margin-top: 20px;">
      <tr>
        <th colspan="4">四、系统静态导通表</th>
      </tr>
      <tr>
        <th>序号</th>
        <th>技术要求</th>
        <th>检查结果</th>
        <th>备注</th>

      </tr>
      <tr v-for="(it,index) in pimSystemStaticConduction.dataList">
        <th>
          <span>{{index+1}}</span>

        </th>

        <th>
          {{it.technicalRequirements}}
        </th>
        <th>
          {{it.inspectionResults}}
        </th>
        <th>
          {{it.remarks}}
        </th>
      </tr>
      <tr>
        <th>备注</th>
        <th colspan="3">
          {{pimSystemStaticConduction.remarks}}
        </th>
      </tr>
      <tr>
        <th>结论</th>
        <th colspan="3">
          {{pimSystemStaticConduction.results}}
        </th>
      </tr>
    </table>

    <table class="top borders other" style="margin-top: 20px;">
      <tr>
        <th colspan="6">五、XX电缆检查表</th>
      </tr>
      <tr>
        <th>序号</th>
        <th>名称</th>
        <th>代号</th>
        <th>编号</th>
        <th>外观检查结果</th>
        <th>通导检查结果</th>

      </tr>
      <tr v-for="(it,index) in pimCableInspection.dataList">
        <th>
          <span>{{index+1}}</span>

        </th>
        <th>
          {{it.productName}}
        </th>
        <th>
          {{it.productCode}}
        </th>
        <th>
          {{it.entityNumber}}
        </th>
        <th>
          {{it.visualInspectionResults}}
        </th>
        <th>
          {{it.conductionInspectionResults}}
        </th>
      </tr>
      <tr>
        <th>备注</th>
        <th colspan="5">
          {{pimCableInspection.remarks}}
        </th>
      </tr>
      <tr>
        <th>结论</th>
        <th colspan="5">
          {{pimCableInspection.results}}
        </th>
      </tr>
    </table>
    <table class="top borders other" style="margin-top: 20px;">
      <tr>
        <th colspan="5">六、分系统测试（系统单试）</th>
      </tr>
      <tr>
        <th>组件</th>
        <th>序号</th>
        <th>检测项目</th>
        <th>技术要求</th>
        <th>检测结果</th>

      </tr>
      <template v-for="(it,index) in pimSystemSingleTest.dataList">


        <tr v-for="(item,idx) in it.pimSystemSingleTestList">
          <th :rowspan="it.pimSystemSingleTestList.length" colspan="1" v-if="idx == 0" style="width: 220px;">
            <span>{{it.moduleName}}</span>
          </th>
          <th>
            <span>{{idx+1}}</span>

          </th>
          <th>
            {{item.inspectionProject}}
          </th>
          <th>
            {{item.technicalRequirements}}
          </th>
          <th>
            {{item.inspectionResults}}
          </th>
        </tr>
      </template>

      <tr>
        <th>备注</th>
        <th colspan="4">
          {{pimSystemSingleTest.remarks}}
        </th>
      </tr>
      <tr>
        <th>结论</th>
        <th colspan="4">
          {{pimSystemSingleTest.results}}
        </th>
      </tr>
    </table>
    <table class="top borders other" style="margin-top: 20px;">
      <tr>
        <th colspan="4">七、系统联试（一）（二）（三）</th>
      </tr>
      <tr>
        <th>序号</th>
        <th>信号名称</th>
        <th>合格范围(单位)</th>
        <th>实测值(单位)</th>

      </tr>
      <tr v-for="(it,index) in pimSystemJointTest.dataList">
        <th>
          <span>{{index+1}}</span>

        </th>

        <th>
          {{it.signalName}}
        </th>
        <th>
          {{it.qualifiedRange}}
        </th>
        <th>
          {{it.measuredValue}}
        </th>
      </tr>
      <tr>
        <th>备注</th>
        <th colspan="3">
          {{pimSystemJointTest.remarks}}
        </th>
      </tr>
      <tr>
        <th>结论</th>
        <th colspan="3">
          {{pimSystemJointTest.results}}
        </th>
      </tr>
    </table>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import flowDjDialog from "../dialog/flowDjDialog";
  import types from '../../store/mutation-types'
  import * as api from '../../api';
  export default {
    name: "ImpPanel",
    props: {
      datas: {
        type: Object
      }
    },
    data() {
      return {
        formData: {
          code: '',
          testLocation: "",
          testType: "",
          temperatureAndHumidity: "",
          dtNumber: "",
          packingBoxNumber: "",
          testTime: "",
          participateUnit: "",
          testResult: "",
        },
        entryData: {},
        pimEntityRegularTest: {
          dataList: [],
          remarks: "",
          results: ""
        },
        pimEquipmentQualityInspecti: {
          dataList: [],
          results: "",
          remarks: ""
        }, pimSystemStaticConduction: {
          dataList: [],
          results: "",
          remarks: ""
        }, pimCableInspection: {
          dataList: [],
          results: "",
          remarks: ""
        }, pimSystemSingleTest: {
          dataList: [],
          results: "",
          remarks: ""
        }, pimSystemJointTest: {
          dataList: [],
          results: "",
          remarks: ""
        },
      }
    },
    mounted(){
      console.log('++++++',this.datas);

    },
    computed: {

    },
    methods: {

    },
    created() {
      this.formData.testLocation = this.datas.testLocation;
      this.formData.testType = this.datas.testType;
      this.formData.temperatureAndHumidity = this.datas.temperatureAndHumidity;
      this.formData.dtNumber = this.datas.dtNumber;
      this.formData.packingBoxNumber = this.datas.packingBoxNumber;
      this.formData.testTime = this.datas.testTime;
      this.formData.participateUnit = this.datas.participateUnit;
      this.formData.testResult = this.datas.testResult;
      this.pimCableInspection = this.datas.pimCableInspection;
      this.pimSystemSingleTest = this.datas.pimSystemSingleTest;
      this.pimSystemJointTest = this.datas.pimSystemJointTest;
      this.pimEquipmentQualityInspecti = this.datas.pimEquipmentQualityInspecti;
      this.pimEntityRegularTest = this.datas.pimEntityRegularTest;
      this.pimSystemStaticConduction = this.datas.pimSystemStaticConduction;
    }
  }
</script>
<style lang="scss">
  .ls{
    width: 100%;
    height: 100%;
  }
  .ls table th {
    text-align: center;
  }

  .ls th {
    color: #303133;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.5;
  }
  .borders {
    border-left: 1px #eee solid;
    border-bottom: 1px #eee solid;
  }
  .head tr th:nth-child(odd) {
    width: 10%;
    padding-left: 5px;
    background-color: #f9f9f9;
  }
  .head tr th:nth-child(even) {
    width: 15%;
  }
  table th {
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
</style>



