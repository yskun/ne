import { IPageOptions } from '@/background/interfaces/page.interface'
import da from './dashboard.page.vue'

export const dashboard:IPageOptions = {
  type: 'dashboard',
  icon: 'dashboard',
  name: '控制台',
  page: da,
  // noToTop: true,
  multiplePage: false,
  closeable: false,
  // noTab: true,
  defaultPage: true
}
