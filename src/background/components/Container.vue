<template>
  <div class="view-container" ref="container">
    <Page ref="page"/>
  </div>
</template>

<script lang="ts">
  import { IPage } from '@/background/interfaces/page-component.interface'
  import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
  import Page from '@/background/components/Page.vue'
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { IPageDirective, IPageIns, IPageOptions, IPageResult } from '@/background/interfaces/page.interface'

  import { dashboard } from '@/background/pages/dashboard/dashboard.config'
  import { DirectiveMap, ResultMap } from '@/background/stores/page.store'
  import { ITaskOptions } from '@/background/interfaces/task.interface'

  @Component({
    name: 'Container',
    components: {
      Page
    },
    computed: {
      ...mapState('page', [
        'result',
        'directive',
        'mountedPageList',
        'nowDirective'
      ]),
      ...mapGetters('page', [
        'nowPage'
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

    @Watch('nowDirective')
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
        const taskOption: ITaskOptions = {
          name: pageOption.name,
          status: 'active',
          scrollX: 0,
          scrollY: 0
        }

        const option: IPageIns = {
          page: pageOption,
          task: taskOption,
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

      if (this['nowPage']) {
        this['nowPage'].task.status = 'inactive'
      }

      this['setNowPageId'](key)

      this['nowPage'].task.status = 'active'

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

      if (this['nowPage']) {
        this['nowPage'].task.status = 'inactive'
      }

      JSON.stringify(this['nowPage'])

      const result = this.pageComponent.switchPage(key)

      this['setNowPageId'](key)

      if (result) {
        JSON.stringify(this['nowPage'])
        this['nowPage'].task.status = 'active'
      } else {
        this['nowPage'].task.status = 'inactive'
      }

      this['sendResult'](<IPageResult>{
        id,
        method,
        result
      })
    }

    close(directive: IPageDirective) {
      if (!directive.key) {
        throw new Error('create method need key option')
      }

      const { id, method, key } = directive

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
