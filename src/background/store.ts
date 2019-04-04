import vue from 'vue'
import vuex from 'vuex'
import { page } from '@/background/page/page.store'
import { menu } from '@/background/menu/menu.store'

vue.use(vuex)

export const Store = new vuex.Store({
  modules: {
    page,
    menu
  },
  state: {
    title: 'Ne. 中台管理系统',
    collapseTitle: 'Ne.',
    modals: [],
  },
  mutations: {
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
    }
  }
})
