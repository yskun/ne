import { VueConstructor } from 'vue'

export interface IPageOptions {
  type?: string
  name?: string
  icon?: string
  page: any
  multiplePage?: boolean

  [prop: string]: any
}

export interface IPageDirective {
  method: 'create' | 'switch' | 'createOrSwitch' | 'close' | 'closeAll' | ''
  key?: string
  page?: IPageOptions | ''
  extend?: any
  id?: number
}

export interface IPageResult {
  id?: number
  method?: 'create' | 'switch' | 'createOrSwitch' | 'close' | 'closeAll' | ''
  result?: any
}

export interface IPageIns {
  page: IPageOptions
  key: string
}

export interface IPageStore {
  nowDirective: IPageDirective[]
  result?: IPageResult[]
  directiveIndex: number
  nowPageId: string
  mountedPageList: IPageIns[]
}
