import { IPageOptions } from '@/background/page/page.interface'

export const error404: IPageOptions = {
  type: 'error404',
  name: '找不到页面',
  icon: 'global',
  page: () => import('./error404.page.vue'),
  // noToTop: true,
  // multiplePage: true,
  // closeable: true,
  noTab: true,
  // defaultPage: true
}
