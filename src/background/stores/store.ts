import vue from 'vue'
import vuex from 'vuex'
import { page } from '@/background/stores/page.store'
import { menu } from '@/background/stores/menu.store'
import { task } from '@/background/stores/task.store'

vue.use(vuex)

export const Store = new vuex.Store({
  modules: {
    page,
    menu,
    task
  },
  state: {
    title: 'Ne. 项目管理终端',
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
