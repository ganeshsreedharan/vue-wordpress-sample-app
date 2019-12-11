
import Vue from 'vue'
import App from './App.vue'
import './assets/css/card.css'
import store from './store/store'
import router from "./routes/routes";
import VueRouter from 'vue-router'
import VueMoment from "vue-moment";
Vue.use(VueMoment);

Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
  router,
  store,
  render: h => h(App),
  
}).$mount('#app')
