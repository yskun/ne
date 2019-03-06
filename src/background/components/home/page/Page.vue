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
    async pageWatcher(page, old) {
      if (old) {
        await this.runDeactivated(old)
      }
      if (!(page && page.$el)) {
        return
      }

      await this.loadPage()
    }

    async mounted() {
      // if (this.page && this.page.$el) {
      //   await this.loadPage()
      // }
      console.log(this)
    }

    private async loadPage() {
      // this.$el.innerHTML = ''
      // this.$children.pop()
      // if (this.page && this.page.$el) {
      //   this.$el.append(this.page.$el)
      //   this.$children.push(this.page)
      //   await this.runActivated(this.page)
      // }
    }

    private async runActivated(ins: Vue) {
      await this.runPageFunc(ins, 'activated')
    }

    private async runDeactivated(ins: Vue) {
      await this.runPageFunc(ins, 'deactivated')
    }

    private async runPageFunc(ins: Vue, method: string) {
      const target: Function | Function[] = ins.$options[method]
      if (target) {
        if (Array.isArray(target)) {
          let length = ins.$options[method].length
          for (let i = 0; i < length; i++) {
            if (typeof target[i] === 'function') {
              await target[i].apply(ins)
            }
          }
        } else if (typeof target === 'function') {
          await target.apply(ins)
        }
      }
    }
  }
</script>

<style scoped>

</style>
