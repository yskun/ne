import Vue from 'vue'
import App from './background/app.vue'
import router from './background/router'
import { Store } from './background/store'
import Antd from 'ant-design-vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)

Vue.config.productionTip = false

let vue = new Vue({
  router,
  store: Store,
  render: h => h(App)
})

window['$message'] = message


vue.$mount('#app')
