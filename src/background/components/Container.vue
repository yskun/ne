<template>
  <div class="view-container" ref="container">
    <Page/>
  </div>
</template>

<script lang="ts">
  import { IPage } from '@/background/interfaces/page-component.interface'
  import Page from '@/background/components/Page.vue'
  import { Component, Vue } from 'vue-property-decorator'
  import { mapGetters } from 'vuex'
  import { IPageIns } from '@/background/interfaces/page.interface'


  @Component({
    name: 'Container',
    components: {
      Page
    },
    computed: {
      ...mapGetters('page', ['nowPageIns'])
    }
  })
  export default class Container extends Vue {

    container: Element

    get pageComponent(): IPage {
      return <any>this.$refs.page
    }

    viewWatcher() {
      if (!this['nowPageIns']) {
        return
      }
      const ins: IPageIns = this['nowPageIns']
      ins.task.scrollY = this.container.scrollTop
      ins.task.scrollX = this.container.scrollLeft
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
