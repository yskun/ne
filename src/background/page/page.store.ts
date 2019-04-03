import { Module } from 'vuex/types'
import { Vue } from 'vue-property-decorator'
import { IPageDirective, IPageIns, IPageOptions, IPageResult, IPageStore } from '@/background/page/page.interface'

export function directiveReciver(context: Vue, callback) {
  context.$watch('$store.state.page.nowDirective', () => {

  }, {
    deep: true
  })
  return () => {
    console.log(this, context)
  }
}

export const page: Module<IPageStore, any> = {
  namespaced: true,
  state: {
    nowDirective: [],
    result: null,
    directiveIndex: 0,
    nowPage: <any>{},
    pageMap: new Map()
  },
  mutations: {
    sendDirective(state, { method, key, page }: IPageDirective) {
      state.nowDirective.push({
        method,
        key: key || '',
        page: page || '',
        id: state.directiveIndex++
      })
    },
    sendResult(state, { id, method, result }: IPageResult) {
      state.result = {
        id: id || 0,
        method,
        result
      }
    },
    mountedPage(state, pageIns: IPageIns) {
      state.nowPage = pageIns
    }
  },
  actions: {
    mountPage({ commit, state }, { page }: { page: IPageOptions }) {
      const id = state.directiveIndex
      commit('sendDirective', <IPageDirective>{
        method: 'create',
        page
      })
      return id
    },
    switchPage({ commit, state }, { key }: { key: string }) {
      const id = state.directiveIndex
      commit('sendDirective', <IPageDirective>{
        method: 'switch',
        key
      })
      return id
    },
    async createOrSwitchPage({ state, dispatch }, { page }: { page: any }) {

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
