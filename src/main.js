// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import {currency} from './filter/currency'

import store from './store'

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueResource)

Vue.filter('currency', currency)
Vue.http.get.options = { withCredentials: true }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
