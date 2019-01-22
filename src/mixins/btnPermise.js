import * as api from "@/api";
import types from "@/store/mutation-types";
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default function () {
  return {
    data() {
      return {

      }
    },
    created() {
      this.checkPermise();
    },
    watch: {},
    computed: {
      ...mapGetters([
        'btnMenu',
      ])
    },
    methods: {
      ...mapMutations({
        setBtnMenu: types.SET_BTN_MENU,
      }),
      checkPermise(callback){
        if(this.btnMenu.length == 0){
          this.$http.get(api.btnmenu_permissions).then((res) => {
            this.setBtnMenu(res.data.data);
          }).catch((exp) => {
            this.setBtnMenu([]);
          });

        }
      }
    },
  }
}
