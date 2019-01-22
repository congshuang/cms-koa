<template>
  <footer class="main-footer">
    <slot name="header"><span class="footer-title" v-text="title" v-if="title"></span></slot>
  </footer>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'main-footer',
    data() {
      return {}
    },
    computed: {},
    props: {

      title: {
        type: String
      },

    }
  }
</script>
<style>

  .main-footer {
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    text-align: center;
    color: #444;
    width: 100%;
    text-align: center;
    display: flex;
    align-content: center;
    justify-content: center;
    position: fixed;
    bottom: 0px;
    z-index: 4;
  }
  .footer-title{
    height: 20px;
    margin-left: -112px;
  }
</style>
