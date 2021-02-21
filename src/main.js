import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import * as echarts from 'echarts'

// 组件全局变量
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.axios = axios
Vue.prototype.echarts = echarts

// axios全局设置
// debug
// axios.defaults.baseURL = 'http://10.219.152.171:9222';
// axios.defaults.baseURL = 'http://localhost:9222';
// prod
axios.defaults.baseURL = 'http://10.219.152.38:9222';

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

