import { Module } from 'vuex'

export const task: Module<any, any> = {
  namespaced: true,
  state: {
    taskList: []

  },
  getters: {},
  mutations: {}
}
