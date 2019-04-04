import { IMenu } from '@/background/interface/menu.interface'
import uuid from 'uuid/v1'

export function handleMenu(menu: IMenu[]): IMenu[] {
  return menu.map(m => {
    if (!m.children) {
      return handleShortCut(m)
    } else {
      return handleChildrenMenu(m)
    }
  })
}

function handleShortCut(menu: IMenu): IMenu {
  const { page, page: { name, icon } } = menu

  return {
    id: menu.id || uuid(),
    name: menu.name || name || '未命名的页面',
    icon: menu.icon || icon || 'default',
    page
  }
}

function handleChildrenMenu(menu: IMenu): IMenu {
  return {
    id: menu.id || uuid(),
    name: menu.name || '未命名的子目录',
    icon: menu.icon || 'default',
    children: handleMenu(menu.children)
  }
}
