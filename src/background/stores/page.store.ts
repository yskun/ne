import { Module } from 'vuex'
import { IPageDirective, IPageIns, IPageOptions, IPageResult, IPageStore } from '@/background/interfaces/page.interface'

export function DirectiveMap() {
  return function(target, prop, desc) {
    const { value } = desc
    desc.value = async function(directive: any[]) {
      if (Array.isArray(directive)) {
        for (let i = 0; i < directive.length; i++) {
          await value.call(this, directive.shift())
        }
      } else {
        await value.call(this, directive)
      }
    }
  }
}

export function ResultMap(receiveIdsParams?: string) {
  return function(target, prop, desc) {
    const { value } = desc
    const receivedResult = []

    const handleReceivedResult = (id: number) => {
      if (receivedResult.length >= 100) {
        receivedResult.shift()
      }

      receivedResult.push(id)
    }

    desc.value = async function(results: IPageResult[]) {
      let targetIdsParams
      if (receiveIdsParams && Array.isArray(this[receiveIdsParams])) {
        targetIdsParams = this[receiveIdsParams]
      }
      results
        .filter(r => {
          const isReceived = receivedResult.includes(r.id)

          if (isReceived) {
            handleReceivedResult(r.id)
          }

          let isTarget = true
          if (targetIdsParams) {
            isTarget = targetIdsParams.includes(r.id)
          }
          return isTarget && !isReceived
        })
        .forEach(result => {
          receivedResult.push(result.id)
          value.call(this, result)
        })

    }
  }
}

export const page: Module<IPageStore, any> = {
  namespaced: true,
  state: {
    nowDirective: [],
    result: [],
    directiveIndex: 0,
    nowPageId: '',
    mountedPageList: []
  },
  getters: {
    nowPage(state) {
      return state.mountedPageList.find(ins => ins.key === state.nowPageId)
    }
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
      if (state.result.length >= 100) {
        state.result.shift()
      }

      state.result.push({
        id: id || 0,
        method,
        result
      })
    },
    setMountedPageList(state, { method, ins }: { method: 'remove' | 'add', ins: IPageIns }) {
      if (method === 'remove') {
        const index = state.mountedPageList.findIndex(page => page.key === ins.key)
        if (index !== -1) {
          state.mountedPageList.slice(index, 1)
        }
      } else if (method === 'add') {
        state.mountedPageList.push(ins)
      }
    },
    setNowPageId(state, id) {
      state.nowPageId = id
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
    removePage({ commit, state }, { id, page }: { id?: string, page?: IPageOptions }) {
      if (id) {

      } else if (page) {

      }
    }
  }
}
