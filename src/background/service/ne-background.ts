import app from '@/background/app.vue'
import Vue, { VueConstructor } from 'vue'
import Antd from 'ant-design-vue'
import { IMenu } from '@/background/menu/menu.interface'
import { Store } from '@/background/store'

Vue.use(Antd)

export class NeBackground {

  title: string = 'Ne. 中台管理系统'
  collapseTitle: string = 'Ne.'

  public getApp(): VueConstructor {
    return app
  }

  public getStore() {
    return Store
  }

  public setMenu(menu: IMenu[]) {
    Store.commit('menu/setMenu', menu)
  }

}

