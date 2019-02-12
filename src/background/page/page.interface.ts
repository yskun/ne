export interface IPageOptions {
  type?: string
  name?: string
  multiplePage?: boolean

  [prop: string]: any
}

export interface IPageIns {
  ins: any
  id: string
  page: any
}

export interface IPageStore {
  nowPage: IPageIns
  pageMap: Map<string, any>
}
