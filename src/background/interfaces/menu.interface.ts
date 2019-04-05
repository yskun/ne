import { IPageOptions } from '@/background/interfaces/page.interface'

export interface IMenu {
  id?: string
  icon?: string
  name?: string
  page?: IPageOptions
  children?: IMenu[]
}

export interface IMenuStore {
  menuList: IMenu[],
  menuCollapsed: boolean
}
