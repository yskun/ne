import { Module } from 'vuex/types'
import { IMenu, IMenuStore } from '@/background/menu/menu.interface'

export const menu: Module<IMenuStore, any> = {
  state: {
    menuList: []
  },
  mutations: {
    setMenu(state, menu: IMenu[]) {
      state.menuList = menu
    }
  },
  actions: {
    async setMenuWithAuth({ commit }, menu: IMenu[]) {
      // brbrbrbr 还没写兄弟
    }
  }
}
