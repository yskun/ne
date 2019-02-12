import { Vue } from 'vue-property-decorator'
import { IPageOptions } from '@/background/page/page.interface'

export function initPage(page): Vue {
  let Page = Vue.extend(page)
  return new Page({
    el: document.createElement('div')
  })
}

export function getPageOptions(page): IPageOptions {
  if (page.page) {
    return page.page
  } else if (page.options && page.options.page) {
    return page.options.page
  } else {
    return {}
  }
}
