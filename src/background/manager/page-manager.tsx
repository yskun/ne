import uuid from 'uuid/v1'
import Vue from 'vue'
import { callHook, isAsyncComponentFunction } from '@/background/methods/page.method'
import { Store } from '@/background/stores/store'

interface PagesResult extends PageResult {
  pages: PageCreateResult[]
}

interface PageCreateResult extends PageResult {
  id?: string
  ins?: Vue
}

interface PageResult {
  result: boolean,
  err?: Error
}

export const PageNotFound = new Error('page not found')
export const WrongPage = new Error('wrong page')
export const PageOnLoad = new Error('page on Load')

export class PageManager {
  pageStore: { [id: string]: Vue } = {}
  onLoadComponent?: Vue

  static createManager() {
    return new PageManager()
  }

  protected constructor() {
  }

  private getPage(page: string | Vue): Vue | Error {
    if (typeof page === 'string') {
      if (!this.pageStore[page]) {
        return PageNotFound
      }
      page = this.pageStore[page]
    }

    if (!page['$$pageId']) {
      return WrongPage
    }

    return page
  }

  private async initComponent(pageComponent: any, data: any, on: any): Promise<Vue> {
    if (isAsyncComponentFunction(pageComponent)) {
      pageComponent = await pageComponent()
    }

    return new Vue({
      store: Store,
      data: function() {
        return {
          props: data || {},
          on: on || {}
        }
      },
      components: {
        page: pageComponent
      },
      render() {
        return (<keep-alive>
          <page {...this.$data}/>
        </keep-alive>)
      }
    })
  }

  getPageById(id: string): PageCreateResult {
    const ins = this.getPage(id)
    if (ins instanceof Error) {
      return { result: false, err: ins }
    }
    return { result: true, ins, id }
  }

  getPagesByName(name: string): PagesResult {
    const pageIds = Object.keys(this.pageStore).filter(pageId => pageId.indexOf(name) === 0)
    const pages: PageCreateResult[] = pageIds.map(id => ({
      result: true,
      id,
      ins: this.pageStore[id]
    }))

    return {
      pages,
      result: true
    }
  }

  getPagesLengthByName(name: string): number {
    return Object.keys(this.pageStore).filter(pageId => pageId.indexOf(name) === 0).length
  }

  mountPage(page: string | Vue): PageResult {
    const pageIns = this.getPage(page)
    if (pageIns instanceof Error) {
      return { result: false, err: pageIns }
    }
    const element = document.createElement('div')
    pageIns.$mount(element)
  }

  show(page: string | Vue): PageResult {
    const pageIns = this.getPage(page)
    if (pageIns instanceof Error) {
      return { result: false, err: pageIns }
    }

    if (this.onLoadComponent && this.onLoadComponent['$$pageId'] === pageIns['$$pageId']) {
      return { result: false, err: PageOnLoad }
    }

    const hideResult = this.hide()
    if (!hideResult.result) {
      return hideResult
    }

    this.onLoadComponent = pageIns
    pageIns.$nextTick(() => {
      callHook(pageIns, 'activated')
    })
  }

  hide(): PageResult {
    if (this.onLoadComponent) {
      try {
        callHook(this.onLoadComponent, 'deactivated')
      } catch (err) {
        return { result: false, err }
      }
    }
    return { result: true }
  }


  async create(pageComponent: any,
               { data, on }: { data?: object, on?: object } = { data: {}, on: {} }): Promise<PageCreateResult> {
    try {
      console.log(on)
      const ins: Vue = await this.initComponent(pageComponent, data, on)
      const id = `${ins.$options.name || '$$NoName'}-${uuid()}`
      ins['$$pageId'] = id
      this.pageStore[id] = ins
      return { result: true, id, ins }
    } catch (err) {
      return { result: false, err }
    }
  }

  destroy(page: string | Vue): PageResult {
    try {
      const pageIns = this.getPage(page)
      if (pageIns instanceof Error) {
        return { result: false, err: pageIns }
      }

      if (this.onLoadComponent && this.onLoadComponent['$$pageId'] === pageIns['$$pageId']) {
        const hideResult = this.hide()
        if (!hideResult.result) {
          return hideResult
        }
      }

      const pageId = pageIns['$$pageId']
      pageIns.$destroy()
      delete this.pageStore[pageId]
      return { result: true }
    } catch (err) {
      return { result: false, err }
    }
  }

  destroyAll(): void {
    Object.keys(this.pageStore).forEach(id => this.destroy(id))
  }
}
