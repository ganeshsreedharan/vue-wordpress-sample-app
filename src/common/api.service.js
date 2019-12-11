import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import { API_URL ,SITE_ID} from "./config";
/*
* Common class for calling api from backend(Wordpress)
*/
const ApiService = {
  //initialise common values
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },
  //SETTING  common headers
  setHeader() {
    Vue.axios.defaults.headers.common[
      "Content-Type"
    ] =  "application/json";
  },

  query(resource,id,category, params = {size:3}) {
    return Vue.axios.post(`${SITE_ID}/${resource}/${id}/${category}`, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
  //Get request
  get(type,id = "",params) {
    return Vue.axios.get(`${SITE_ID}/${type}/${id}`,params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;
