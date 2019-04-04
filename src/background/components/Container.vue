<template>
  <div class="view-container" ref="container">
    <page ref="page"/>
  </div>
</template>

<script lang="ts">
  import { IPage } from '@/background/interface/page-component.interface'
  import { mapMutations, mapState, mapActions } from 'vuex'
  import Page from '@/background/components/Page.vue'
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { IPageDirective, IPageIns, IPageOptions, IPageResult } from '@/background/interface/page.interface'

  import { dashboard } from '@/background/pages/dashboard/dashboard.config'
  import { error404 } from '@/background/pages/Error404/error404.config'
  import { DirectiveMap, ResultMap } from '@/background/stores/page.store'

  @Component({
    name: 'Container',
    components: {
      Page
    },
    computed: {
      ...mapState('page', [
        'result',
        'directive',
        'mountedPageList'
      ])
    },
    methods: {
      ...mapMutations('page', [
        'sendDirective',
        'sendResult',
        'setMountedPageList',
        'setNowPageId'
      ]),
      ...mapActions('page', [
        'mountPage',
        'switchPage'
      ])
    }
  })
  export default class Container extends Vue {

    container: Element
    singleInstance: { page: any, key: string }[] = []
    nowInstanceList: { ins: any, option: IPageIns }[] = []

    get pageComponent(): IPage {
      return <any>this.$refs.page
    }


    get nowPage() {
      return this.$store.state.page.nowPage.ins
    }

    get directive(): IPageDirective {
      return this.$store.state.page.nowDirective
    }

    @Watch('directive')
    @DirectiveMap()
    directiveWatcher(directive: IPageDirective) {
      if (directive.method === '') {
        return
      }

      if (!this[directive.method]) {
        throw new Error(`no '${directive.method}' method on container`)
      }

      this[directive.method](directive)
    }

    @Watch('result')
    @ResultMap()
    resultWatcher(result) {
      console.log(`container: resultWatcher ->`, result)
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
        const option: IPageIns = {
          page: pageOption,
          key
        }
        this.nowInstanceList.push({ ins, option })
        this['setMountedPageList']({
          method: 'add',
          ins: option
        })
        if (pageOption.multiplePage === false) {
          this.singleInstance.push({ page: pageOption.page, key })
        }
      }

      this['setNowPageId'](key)

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

      this['setNowPageId'](key)
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
