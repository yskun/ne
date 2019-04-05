import { Module } from 'vuex'
import { IMenu, IMenuStore } from '@/background/interfaces/menu.interface'
import { handleMenu } from '@/background/methods/menu.method'

export const menu: Module<IMenuStore, any> = {
  namespaced: true,
  state: {
    menuList: [],
    menuCollapsed: true
  },
  mutations: {
    setMenu(state, menu: IMenu[]) {
      state.menuList = handleMenu(menu)
    },
    setMenuCollapsed(state, is: boolean) {
      state.menuCollapsed = is
    }
  }
}
