<template>
  <div></div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  /**
   * 用来保证页面逻辑的
   * 这是一个很神奇的组件
   */

  @Component({
    name: 'Page'
  })
  export default class Page extends Vue {
    @Prop()
    page: any

    pageMap: Map<string, Vue> = new Map()

    @Watch('page')
    pageWatcher(page) {
      console.log(page)
    }

    initPage(page) {
      let Page = Vue.extend(page)
      return new Page({
        el: document.createElement('div')
      })
    }

    getOrInitPage() {
      if (this.pageMap.has(this.page.key)) {
        return this.pageMap.get(this.page.key)
      } else {
        return this.initPage(this.page)
      }
    }

    mounted() {
      console.log(this.page)
      this.getOrInitPage()
      // this.$el.replaceWith(pageIns.$el)
    }
  }
</script>

<style scoped>

</style>
