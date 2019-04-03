export const error404 = {
  type: 'error404',
  name: '找不到页面',
  pages: [
    {
      name: 'Error404',
      component: () => import('./error404.page')
    }
  ],
  // noToTop: true,
  // multiplePage: true,
  // closeable: true,
  noTab: true,
  // defaultPage: true
}
