import { IPageOptions } from '@/background/page/page.interface'

export function Page(options: IPageOptions = {}) {
  return function(Component) {
    Component.options.page = options
    return Component
  }
}
