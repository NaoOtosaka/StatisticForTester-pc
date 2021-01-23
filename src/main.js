import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.axios = axios


axios.defaults.baseURL = 'http://192.168.31.36:9222';
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

