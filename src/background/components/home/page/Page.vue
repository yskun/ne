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



    @Watch('page')
    pageWatcher() {
      this.loadPage()
    }

    mounted() {
      this.loadPage()
    }

    private loadPage() {
      this.$el.innerHTML = ''
      this.$children.pop()
      if (this.page && this.page.$el) {
        this.$el.append(this.page.$el)
        this.$children.push(this.page)
      }
    }
  }
</script>

<style scoped>

</style>
