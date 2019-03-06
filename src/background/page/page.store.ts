import { Module } from 'vuex/types'
import { Vue } from 'vue-property-decorator'
import * as uuid from 'uuid/v1'
import { getPageOptions, initPage } from '@/background/page/page.util'
import { IPageIns, IPageStore } from '@/background/page/page.interface'

export const page: Module<IPageStore, any> = {
  state: {
    nowPage: <any>{},
    pageMap: new Map()
  },
  mutations: {
    mountedPage(state, pageIns: IPageIns) {
      state.nowPage = pageIns
    }
  },
  actions: {
    async createPage({ commit, state }, { page, mounted = true }: { page: any, mounted: boolean }) {
      // 判断是否为异步加载组件
      console.log(page)
      if (typeof page === 'function' && !(page.prototype instanceof Vue)) {
        page = (await page()).default
      }

      let pageOptions = getPageOptions(page)
      let id: string
      if (!pageOptions.multiplePage) {
        if (state.pageMap.has(pageOptions.type)) {
          return false
        }
        id = pageOptions.type || uuid()
      } else {
        id = uuid()
      }

      let ins = await initPage(page)

      let result = {
        id, ins, page
      }
      state.pageMap.set(id, result)
      if (mounted) {
        commit('mountedPage', result)
      }
      return result
    },
    async switchPage({ commit, state }, { id }: { id: string }) {
      if (!state.pageMap.has(id)) {
        throw new Error('no page instance on pageMap, please make sure the id:' + id + 'is a real id')
      }
      let result = state.pageMap.get(id)
      if (state.nowPage === result.ins) {
        return false
      }
      commit('mountedPage', result)
      return true
    },
    async createOrSwitchPage({ state, dispatch }, { page }: { page: any }) {
      if (typeof page === 'function' && !(page.prototype instanceof Vue)) {
        page = (await page()).default
      }
      let pageOptions = getPageOptions(page)
      if (!pageOptions.multiplePage && state.pageMap.has(pageOptions.type)) {
        return dispatch('switchPage', { id: pageOptions.type })
      }
      return dispatch('createPage', page)
    },
    removePage({ commit, state }, { id, switchWhenOnMounted = true }: { id: string, switchWhenOnMounted: boolean }) {
      if (!state.pageMap.has(id)) {
        return false
      }

      let result = state.pageMap.get(id)
      state.pageMap.delete(id)
      if (result.ins === state.nowPage.ins) {
        if (!switchWhenOnMounted) {
          return true
        }
        if (state.pageMap.size > 1) {
          let ins = state.pageMap.values().next().value
          commit('mountedPage', ins)
        }
        // 销毁实例
        (<Vue>result.ins).$destroy()
        return true
      }
    }
  }
}
