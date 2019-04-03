import { IMenu } from '@/background/menu/menu.interface'
import { dashboard } from '@/background/components/pages/dashboard/dashboard.config'
import { error404 } from '@/background/components/pages/Error404/error404.config'

export const defaultPageList: IMenu[] = [{
  page: dashboard
}, {
  name: '组1',
  icon: 'dashboard',
  children: [{
    name: '组1-1',
    icon: 'dashboard',
    children: [{
      page: error404
    }]
  }]
}]
