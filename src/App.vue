<template>
  <div id="app">
    <!--contents area-->
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <!-- Header Component-->
    <HeaderComponent></HeaderComponent>
    <!-- Loading content dynamically here-->
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import jQuery from "jquery";
import PopperJs from "popper.js";
import "bootstrap";
import { vueTopprogress } from "vue-top-progress";

//Before initialising jQuery the  bootstrap was loading and Jquery was not defined
//so I have made it imorted dynamically
const getBootstrap = () => import("bootstrap-material-design");
global.jQuery = window.jQuery = window.$ = jQuery;
window.jQuery = jQuery;
global.Popper = window.Popper = PopperJs;

export default {
  name: "app",
  components: {
    HeaderComponent,
    vueTopprogress
  },
  created() {
    //loading material bootstrap dynamically
    getBootstrap().then(m => {
      m.default;
      window.jQuery("body").bootstrapMaterialDesign();
    });
  },
  mounted() {
    
     setTimeout(() => {
      this.$refs.topProgress.done();
     }, 2000); 
  }
};
</script>


