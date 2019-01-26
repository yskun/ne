import clone from 'lodash.clone'
import omit from 'lodash.omit'
import uuid from 'uuid/v1'
import { pageList } from '../../../../pages/list'
import { defaultPageList } from '../../pages/list'

class PageCenter {
  pages = []
  configList = new Map()
  nowPages = new Map()
  nowPageList = []
  store = {}
  defaultPageList = []
  error404 = null

  constructor() {
    this.pages = defaultPageList.concat(pageList)
    console.log(this.pages)
    this.mountError()
  }

  mountError() {
    let page = this.pages.find(p => p.type === 'error404')
    if (!page) {
      return
    }
    let mountPage = this.mount(page.type)
    if (mountPage) {
      this.error404 = mountPage
      console.log(this.error404)
    }
  }

  mountDefaultPage() {
    this.defaultPageList = this.pages
      .map(p => p.defaultPage === true && this.mount(p.type))
      .filter(p => !!p)
    return this.defaultPageList
  }

  getComponent(target, components = {}) {
    this.pages.forEach(page => {
      if (page[target] && page[target].length) {
        page[target].forEach(p => {
          if (!(p && p.name && p.component)) {
            return
          }
          components[p.name] = p.component
        })
      }
    })

    return components
  }

  static retMountIns(page, pageIns, isNew) {
    return {
      multiplePage: !!page.multiplePage,
      pageInsCount: pageIns.length,
      isNew,
      ins: pageIns
    }
  }

  mount(type) {
    let page = this.pages.find(p => p.type === type)
    if (!page) {
      return this.error404
    }

    let config
    if (this.configList.has(type)) {
      config = this.configList.get(type)
    } else {
      config = clone(page)
      omit(config, [
        'store',
        'pages',
        'modals',
        'multiplePage',
        'noTab',
        'defaultPage'
      ])
      this.configList.set(type, config)
      console.log(config)
    }

    let nowPages = this.getPageByType(page.type)
    if (!page.multiplePage && nowPages.length > 0) {
      return PageCenter.retMountIns(page, nowPages, false)
    }

    let store = {}
    if (page.store) {
      if (typeof page.store === 'function') {
        store = page.store()
      } else {
        store = page.store
      }
    }

    let pageIns = {
      config,
      store,
      $id: uuid(),
      pages: page.pages && page.pages.map(p => p.name),
      modals: page.modals && page.modals.map(m => m.name),
      name: page.name || '',
      type: page.type || '',
      index: nowPages.length + 1,
      instanceNo: this.getInstanceNo(page.type),
      multiplePage: !!page.multiplePage,
      noTab: page.noTab,
      defaultPage: page.defaultPage,
      closeable: page.closeable,
      viewTopScroll: 0
    }

    this.pushPage(pageIns)
    return PageCenter.retMountIns(page, [pageIns], true)
  }

  getInstanceNo(type) {
    let no = 0
    this.nowPageList.forEach(
      page =>
        page.type === type && page.instanceNo > no && (no = page.instanceNo)
    )
    return no + 1
  }

  getPageByType(type) {
    let ret = []
    this.nowPages.forEach(page => {
      if (page.type === type) {
        ret.push(page)
      }
    })
    return ret
  }

  getPageById(id) {
    return this.nowPages.get(id) || this.error404
  }

  pushPage(pageIns) {
    this.nowPageList.push(pageIns)
    this.nowPages.set(pageIns.$id, pageIns)
  }

  removePage(id) {
    let page = this.nowPageList.findIndex(p => p.$id === id)
    if (page !== -1) {
      this.nowPageList.splice(page, 1)
    }
    return this.nowPages.delete(id)
  }
}

export const pageCenter = new PageCenter()
