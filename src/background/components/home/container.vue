<template>
  <div class="view-container" ref="container">
    <page :page="nowPage"></page>
  </div>
</template>

<script lang="ts">
  import Dashboard from '../pages/dashboard/dashboard.page.vue'
  import Error404 from '../pages/Error404/error404.page.vue'
  import Page from './page/Page.vue'
  import { Vue, Component } from 'vue-property-decorator'
  import * as uuid from 'uuid/v1'

  @Component({
    name: 'Container',
    components: {
      Page
    }
  })
  export default class Container extends Vue {
    nowPage: any = ''
    pageMap: Map<string, { id: string, ins: any, page: any }> = new Map()
    testPage: string[] = []
    page = {}
    data = {}
    config = {}
    container = {}

    createPage(page: any, mounted: boolean = true) {
      let ins = this.initPage(page)
      let id: string = uuid()
      let result = {
        id, ins, page
      }
      this.pageMap.set(id, result)
      if (mounted) {
        this.nowPage = ins
      }
      return result
    }

    removePage(id: string, switchWhenOnMounted: boolean = true) {
      if (!this.pageMap.has(id)) {
        return
      }

      let result = this.pageMap.get(id)
      if (result.ins === this.nowPage.ins) {
        if (!switchWhenOnMounted) {
          return
        }
        if (this.pageMap.size > 1) {

        }
      }
    }

    switchPage(id: string) {
      if (!this.pageMap.has(id)) {
        throw new Error('no page instance on pageMap, please make sure the id:' + id + 'is a real id')
      }
      let result = this.pageMap.get(id)
      this.nowPage = result.ins
    }

    private initPage(page): Vue {
      let Page = Vue.extend(page)
      return new Page({
        el: document.createElement('div')
      })
    }

    mounted() {
      this.testPage.push(
        this.createPage(Dashboard).id,
        this.createPage(Error404, false).id
      )
      window['switchPage'] = (num: number) => {
        this.switchPage(this.testPage[num])
      }
    }

  }

  // export default {
  //   methods: {
  //     methodHandle(content) {
  //       if (!(content && content.type)) {
  //         return
  //       }
  //
  //       if (content.type === 'modal') {
  //         this.$store.commit('showModal', {
  //           data: content.data || null,
  //           component: content.component,
  //           $config: this.config
  //         })
  //       }
  //     },
  //     viewWatcher() {
  //       this.page.viewTopScroll = this.container.scrollTop
  //     },
  //     bindViewScrollWatcher() {
  //       this.container = this.$refs.container
  //       this.container.addEventListener('scroll', this.viewWatcher, false)
  //     },
  //     removeViewScrollWatcher() {
  //       this.container.removeEventListener('scroll', this.viewWatcher, false)
  //     }
  //   },
  //   mounted() {
  //     // this.bindViewScrollWatcher()
  //   },
  //   destroyed() {
  //     this.removeViewScrollWatcher()
  //   }
  // }
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
