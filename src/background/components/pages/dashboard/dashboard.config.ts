import { IPageOptions } from '@/background/page/page.interface'

export const dashboard:IPageOptions = {
  type: 'dashboard',
  icon: 'dashboard',
  name: '控制台',
  page: () => import('./dashboard.page.vue'),
  // noToTop: true,
  // multiplePage: true,
  closeable: false,
  // noTab: true,
  defaultPage: true
}
