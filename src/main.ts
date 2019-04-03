import Vue from 'vue'
import router from './background/router'
import 'ant-design-vue/dist/antd.css'
import { NeBackground } from '@/background/service/ne-background'
import { defaultPageList } from '@/background/components/pages/list'


const ne = new NeBackground()
ne.setMenu(defaultPageList)

Vue.config.productionTip = false

let vue = new Vue({
  router,
  store: ne.getStore(),
  render: h => h(ne.getApp())
})


vue.$mount('#app')
