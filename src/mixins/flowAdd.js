import * as api from "@/api";
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default function () {
  return {
    data() {
      return {

      }
    },
    created() {

    },
    watch: {},
    computed: {
    },
    methods: {

      checkAudit(callback){
        let obj ={
          busiModelId:this.menuId,
          operType:this.operType
        }
        this.$http.post(api.SYS_applyBefore_checkNeedAudit,obj).then((res) => {
          callback(res);
        }).catch((res) => {
          this.$message.error('请求失败,请检查网络...');
        });
      }
    },
  }
}
