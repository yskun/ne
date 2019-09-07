import { ITaskOptions } from '@/background/interfaces/task.interface'
import { PageManager } from '@/background/manager/page-manager'
import { Vue } from 'vue/types/vue'

export interface IPageOptions {
  type?: string
  name?: string
  icon?: string
  page: any
  multiplePage?: boolean

  [prop: string]: any
}

export interface IPageIns {
  page: IPageOptions
  task: ITaskOptions
  props: PageProps
  ins: Vue
  id: string
}

export interface PageProps {
  data?: object
  on?: object
}

export interface IPageStore {
  pageManager: PageManager
  nowPageId: string
  mountedPageList: IPageIns[]
}
