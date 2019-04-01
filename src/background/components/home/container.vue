<template>
  <div class="view-container" ref="container">
    <page ref="page">
    </page>
  </div>
</template>

<script lang="ts">
  import { IPage } from '@/background/components/home/page/IPage'

  let Dashboard = () => import('../pages/dashboard/dashboard.page.vue')
  import Error404 from '../pages/Error404/error404.page.vue'
  import Page from './page/Page.vue'
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { IPageDirective, IPageOptions } from '@/background/page/page.interface'

  @Component({
    name: 'Container',
    components: {
      Page
    }
  })
  export default class Container extends Vue {

    container: Element
    pageComponent: IPage
    singleInstance: { page: any, key: string }[] = []
    nowInstanceList: { page: any, ins: any, key: string, option: IPageOptions }[] = []

    get nowPage() {
      return this.$store.state.page.nowPage.ins
    }

    get directive(): IPageDirective {
      return this.$store.state.page.nowDirective
    }

    @Watch('directive')
    directiveWatcher(directive: IPageDirective) {
      if (directive.method === '') {
        return
      }

      if (!this[directive.method]) {
        throw new Error(`no '${directive.method}' method on container`)
      }

      this[directive.method](directive)
    }

    async create(directive: IPageDirective) {
      if (!directive.page) {
        throw new Error('create method need page option')
      }

      const pageOption: IPageOptions = directive.page

      // 如果不允许多例则终结创建过程
      if (pageOption.multiplePage === false) {
        const result = this.singleInstance.findIndex(instance => instance.page === (<IPageOptions>directive.page).page)
        if (result > -1) {
          return
        }
      }

      const key = await this.pageComponent.create(pageOption.page)
      if (key) {
        const ins = this.pageComponent.getInstance(key)
        this.nowInstanceList.push({
          ins,
          key,
          page: pageOption.page,
          option: pageOption
        })
        if (pageOption.multiplePage === false) {
          this.singleInstance.push({ page: pageOption.page, key })
        }
      }
    }

    switch(directive: IPageOptions) {

    }

    viewWatcher() {
      // this.pageOptions.viewTopScroll = this.container.scrollTop
    }

    bindViewScrollWatcher() {
      this.container = <Element>this.$refs.container
      this.container.addEventListener('scroll', this.viewWatcher, false)
    }

    removeViewScrollWatcher() {
      this.container.removeEventListener('scroll', this.viewWatcher, false)
    }


    async mounted() {
      this.pageComponent = <any>this.$refs.page
      const key = await this.pageComponent.create(Error404)
      console.log(key)
      console.log(await this.pageComponent.remove(key))
      this.bindViewScrollWatcher()
    }

    destroyed() {
      this.removeViewScrollWatcher()
    }
  }
</script>

<style lang="less" scoped>
  .view-container {
    padding: 10px;
    position: relative;
    flex: 1;
    overflow: auto;
    height: calc(100vh - 116px);
  }

  .tab-card /deep/ {
    margin-bottom: 5px;

    .ivu-card-body {
      padding: 5px 16px 1px;
    }
  }

  .tab-card /deep/ .ivu-card-body {
    padding: 5px 16px 1px;
  }
</style>
