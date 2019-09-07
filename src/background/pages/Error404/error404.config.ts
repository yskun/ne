import { IPageOptions } from '@/background/interfaces/page.interface'
import Error404 from './error404.page.vue'

export const error404: IPageOptions = {
  type: 'error404',
  name: '找不到页面',
  icon: 'global',
  page: Error404,
  // noToTop: true,
  multiplePage: false,
  // closeable: true,
  noTab: true
  // defaultPage: true
}
