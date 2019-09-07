import { IPageOptions } from '@/background/interfaces/page.interface'

export const dashboard: IPageOptions = {
  type: 'dashboard',
  icon: 'dashboard',
  name: '控制台',
  page: () => import('./dashboard.page.vue'),
  // noToTop: true,
  multiplePage: false,
  closeable: false,
  // noTab: true,
  defaultPage: true
}
