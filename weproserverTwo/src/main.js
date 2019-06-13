// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import axios from 'axios'
import echarts from 'echarts'
import jnp from 'vue-jsonp'


Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$axios.defaults.baseURL="/api"
Vue.prototype.$echarts = echarts
Vue.use(jnp)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
