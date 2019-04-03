
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
  ins: any
  id: string
  page: any
}

export interface IPageStore {
  nowDirective: IPageDirective[]
  result?: IPageResult
  directiveIndex: number
  nowPage: IPageIns
  pageMap: Map<string, any>
}
