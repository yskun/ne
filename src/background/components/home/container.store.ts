import { Module } from 'vuex/types'
import { IPageAction } from './page/page.interface'

export const container: Module<any, any> = {
  state: {
    nowPageIns: ''
  },
  mutations: {
    change(state, action: IPageAction) {

    }
  },
  actions: {
    change({state},){}
  }
}
