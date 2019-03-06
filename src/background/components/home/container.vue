<template>
  <div class="view-container" ref="container">
    <page :page="nowPage">
      <div></div>
    </page>
  </div>
</template>

<script lang="ts">
  let Dashboard = () => import('../pages/dashboard/dashboard.page.vue')
  import Error404 from '../pages/Error404/error404.page.vue'
  import Page from './page/Page.vue'
  import { Vue, Component } from 'vue-property-decorator'
  import { IPageOptions } from '@/background/page/page.interface'

  @Component({
    name: 'Container',
    components: {
      Page
    }
  })
  export default class Container extends Vue {
    testPage: string[] = []
    container: Element

    get nowPage() {
      return this.$store.state.page.nowPage.ins
    }

    get pageOptions(): IPageOptions {
      if (!this.nowPage) {
        return {}
      }

      return this.nowPage.$options.page || {}
    }

    switchPage(id: string) {
      this.$store.dispatch('switchPage', { id: id })
    }

    async createPage(page, mounted = true) {
      console.log(this.$store)
      return await this.$store.dispatch('createPage', { page, mounted }).then(value => {
        console.log(`createPageResult`, value)
        return value
      })
    }

    viewWatcher() {
      this.pageOptions.viewTopScroll = this.container.scrollTop
    }

    bindViewScrollWatcher() {
      this.container = <Element>this.$refs.container
      this.container.addEventListener('scroll', this.viewWatcher, false)
    }

    removeViewScrollWatcher() {
      this.container.removeEventListener('scroll', this.viewWatcher, false)
    }


    async mounted() {
      this.testPage.push(
        (await this.createPage(Dashboard)).id,
        (await this.createPage(Error404, false)).id
      )
      window['switchPage'] = (num: number) => {
        this.switchPage(this.testPage[num])
      }
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
