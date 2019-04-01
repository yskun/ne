
export interface IPageOptions {
  type?: string // 识别
  name?: string // 名称
  icon?: string // 图标
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
  method?: number
  result?: any
}

export interface IPageIns {
  ins: any
  id: string
  page: any
}

export interface IPageStore {
  nowDirective: IPageDirective
  result?: IPageResult
  directiveIndex: number
  nowPage: IPageIns
  pageMap: Map<string, any>
}
