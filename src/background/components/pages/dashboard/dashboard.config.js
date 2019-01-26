export const dashboard = {
  type: 'dashboard',
  icon: 'dashboard',
  name: '控制台',
  pages: [
    {
      name: 'Dashboard',
      component: () => import('./dashboard.page')
    }
  ],
  // noToTop: true,
  // multiplePage: true,
  closeable: false,
  // noTab: true,
  defaultPage: true
}
