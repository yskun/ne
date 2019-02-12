export interface IMenu {
  icon?: '',
  name: '',
  type?: '', // type 需与Page中的type匹配
  page?: any,
  children?: IMenu[]
}

export interface IMenuStore {
  menuList: IMenu[]
}
