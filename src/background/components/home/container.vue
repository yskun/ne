<template>
  <div class="view-container" ref="container">
    <component :is="component" :config="config" :data="data" @method="methodHandle"/>
    <div class="eee"></div>
  </div>
</template>

<script>
  import ToTop from '../common/to-top'
  import { pageCenter } from './page-center/page-center'
  import Vue from "vue"

  export default {
    name: 'Container',
    components: pageCenter.getComponent('pages', {
    }),
    data() {
      return {
        component: 'Error404',
        page: {},
        data: {},
        config: {},
        container: {}
      }
    },
    watch: {
      '$store.state.page'() {
        this.mountPage()
      }
    },
    methods: {
      methodHandle(content) {
        if (!(content && content.type)) {
          return
        }

        if (content.type === 'modal') {
          this.$store.commit('showModal', {
            data: content.data || null,
            component: content.component,
            $config: this.config
          })
        }
      },
      mountPage() {
        let page = this.$store.state.page
        if (page && page.name) {
          this.page = page
          // todo 此处会导致切换页面时出现性能问题，有待解决，若不先清空当前页，可能会导致某些状态不能被刷新
          // update 1 目前此处通过判断目标是否一致选择是否先清空状态
          if (this.component === page.pages[0]) {
            this.component = ''
          } else {
            this.component = page.pages[0]
          }
          this.$set(this, 'data', page.store)
          this.config = page.config || {}
        } else {
          this.component = 'Error404'
        }
        this.$nextTick(function() {
          if (page && page.pages) {
            this.component = page.pages[0]
            this.$nextTick(function() {
              this.container.scrollTop = this.page.viewTopScroll
            })
          }
        })
      },
      viewWatcher() {
        this.page.viewTopScroll = this.container.scrollTop
      },
      bindViewScrollWatcher() {
        this.container = this.$refs.container
        this.container.addEventListener('scroll', this.viewWatcher, false)
      },
      removeViewScrollWatcher() {
        this.container.removeEventListener('scroll', this.viewWatcher, false)
      }
    },
    mounted() {
      (new Vue({
        render: h => h(ToTop)
      })).$mount('.eee')
      // this.mountPage()
      // this.bindViewScrollWatcher()
    },
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
