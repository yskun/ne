export interface IPageAction {
  method: 'new' | 'close' | 'restore'
  page?: any,
  pageId?: string
}
