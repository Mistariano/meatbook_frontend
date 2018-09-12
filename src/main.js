// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from 'store'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

axios.interceptors.request.use(
  config => {
    let authToken = store.get('token')
    if (authToken === null) {
      authToken = 'null'
    }
    config.headers.Authorization = authToken
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
