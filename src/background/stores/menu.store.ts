import { Module } from 'vuex'
import { IMenu, IMenuStore } from '@/background/interface/menu.interface'
import { handleMenu } from '@/background/menu/menu.method'

export const menu: Module<IMenuStore, any> = {
  namespaced: true,
  state: {
    menuList: [],
    menuCollapsed: false
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
