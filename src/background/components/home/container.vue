<template>
  <div class="view-container" ref="container">
    <page ref="page">
    </page>
  </div>
</template>

<script lang="ts">
  import { IPage } from '@/background/components/home/page/IPage'
  import { mapMutations, mapState, mapActions } from 'vuex'
  import Page from './page/Page.vue'
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { IPageDirective, IPageOptions, IPageResult } from '@/background/page/page.interface'
  import uuid from 'uuid/v1'
  import { directiveReciver } from '@/background/page/page.store'

  import { dashboard } from '../pages/dashboard/dashboard.config'
  import { error404 } from '../pages/Error404/error404.config'

  @Component({
    name: 'Container',
    components: {
      Page
    },
    computed: {
      ...mapState('page', [
        'result'
      ])
    },
    methods: {
      ...mapMutations('page', [
        'sendDirective',
        'sendResult'
      ]),
      ...mapActions('page', [
        'mountPage',
        'switchPage'
      ])
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
      console.log(directive)
      return
      if (directive.method === '') {
        return
      }

      if (!this[directive.method]) {
        throw new Error(`no '${directive.method}' method on container`)
      }

      this[directive.method](directive)
    }

    @Watch('result')
    resultWatcher(result) {
      console.log(result)
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
      this['sendResult']({
        id: directive.id,
        method: directive.method,
        result: key
      })
    }

    switch(directive: IPageDirective) {
      if (!directive.key) {
        throw new Error('create method need key option')
      }

      const { id, method, key } = directive

      const result = this.pageComponent.switchPage(key)

      this['sendResult'](<IPageResult>{
        id,
        method,
        result
      })
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

      window['switchPage'] = (key: string) => {
        console.log(this)
        this['switchPage']({
          key
        })
      }

      this['mountPage']({
        page: dashboard
      })

      this['mountPage']({
        page: error404
      })

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
