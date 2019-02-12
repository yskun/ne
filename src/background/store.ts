import vue from 'vue'
import vuex from 'vuex'
import { pageCenter } from './components/home/page-center/page-center'
import { page } from '@/background/page/page.store'
import { menu } from '@/background/menu/menu.store'

vue.use(vuex)

export const Store = new vuex.Store({
  modules: {
    page,
    menu
  },
  state: {
    component: {},
    modals: [],
    menuCollapsed: false
  },
  mutations: {
    changePageByType(state, key) {
      let page = pageCenter.mount(key)
      if (!page) {
        // state.page = ''
        return
      }
      // state.page = page.ins[0]
    },
    changePageById(state, key) {
      let page = pageCenter.getPageById(key)
      if (page) {
        // state.page = page
      } else {
        // state.page = ''
      }
    },
    changeComponent(state, target) {
      state.component = target
    },
    showModal(state, modal) {
      state.modals = state.modals
        .map(m => {
          if (m.$show) {
            return m
          }
        })
        .filter(m => !!m)
      modal.$show = true
      modal.$id = new Date().getTime()
      state.modals.push(modal)
    },
    changeMenuCollapsed(state) {
      state.menuCollapsed = !state.menuCollapsed
    }
  }
})
