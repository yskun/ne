import { Module } from 'vuex'
import { IPageIns, IPageOptions, IPageStore, PageProps } from '@/background/interfaces/page.interface'
import { PageManager } from '@/background/manager/page-manager'
import { ITaskOptions } from '@/background/interfaces/task.interface'

export const page: Module<IPageStore, any> = {
  namespaced: true,
  state: {
    pageManager: PageManager.createManager(),
    nowPageId: '',
    mountedPageList: []
  },
  getters: {
    nowPageIns(state): IPageIns {
      return state.mountedPageList.find(ins => ins.id === state.nowPageId) || null
    },
    taskList(state): IPageIns[] {
      return state.mountedPageList.filter(page => page.page.showInTaskBar !== false)
    }
  },
  mutations: {
    setMountedPageList(state, { method, ins: { page, ins, id, props, parentId } }) {
      if (method === 'remove') {
        const index = state.mountedPageList.findIndex(page => page.id === ins.id)
        if (index !== -1) {
          state.mountedPageList.splice(index, 1)
        }
      } else if (method === 'add') {
        const task: ITaskOptions = {
          name: page.name,
          parentId: parentId || null,
          scrollX: 0,
          scrollY: 0
        }
        state.mountedPageList = [...state.mountedPageList, {
          page,
          task,
          props,
          ins,
          id
        }]
      }
    },
    setNowPageId(state, id) {
      state.nowPageId = id
    }
  },
  actions: {
    async mountPage({ commit, state }, { page, props, parentId }: { page: IPageOptions, props: PageProps, parentId?: string }) {
      props = props || {}
      const { result, err, ins, id } = await state.pageManager.create(page.page, props)
      if (result === false) {
        return { result, err }
      }
      commit('setMountedPageList', { method: 'add', ins: { page, ins, id, props } })
      commit('setNowPageId', id)
      return { result: true, id }
    },
    switchPage({ commit, state }, { id }: { id: string }) {
      const exist = state.mountedPageList.findIndex(v => v.id === id) !== -1
      if (!exist) {
        return { result: false }
      }
      commit('setNowPageId', id)
      return { result: true }
    },
    closePage({ commit, state }, { id }: { id: string }) {
      if (state.nowPageId === id) {
        const pageIns = state.mountedPageList.find(v => v.id === id)
        if (pageIns) {
          let parentId = pageIns.task.parentId
          if (!parentId && state.mountedPageList[0].id) {

          }
        }
      }
    },
    async startPage({ commit, state, dispatch }, { page, props, parentId }: { page: IPageOptions, props: PageProps, parentId?: string }) {
      const multiplePage = page.multiplePage !== false
      if (!multiplePage) {
        const pageIns = state.mountedPageList.find(pageIns => pageIns.page.type === page.type)
        if (pageIns) {
          return dispatch('switchPage', { id: pageIns.id })
        }
      }

      return dispatch('mountPage', { page, props, parentId })
    }
  }
}
