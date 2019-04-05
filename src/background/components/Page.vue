<template>
  <keep-alive ref="aliveComponent">
    <component :is="nowPage" :key="nowKey" ref="pageIns"></component>
  </keep-alive>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import uuid from 'uuid/v1'
  import { IPage } from '@/background/interfaces/page-component.interface'

  /**
   * 用来管理页面数据
   */

  @Component({
    name: 'Page'
  })
  export default class Page extends Vue implements IPage {
    nowPage: any = ''
    nowKey: string = ''
    aliveComponent: { cache: any, keys: string[] }
    pageStore: Map<string, { page: any, ins: any }> = new Map()

    get nowPageIns() {
      return this.$refs.pageIns
    }

    switchPage(key: string): boolean {
      if (!this.pageStore.has(key)) {
        return false
      }
      this.nowPage = this.pageStore.get(key).page
      this.nowKey = key
      return true
    }

    async create(page: any): Promise<string> {
      this.nowPage = page
      let key = uuid()
      this.nowKey = key
      await new Promise(resolve => {
        this.$nextTick(() => {
          this.pageStore.set(key, {
            page,
            ins: this.nowPageIns
          })
        })
        resolve()
      })

      return key
    }

    async remove(key: string): Promise<boolean> {
      if (this.nowKey === key) {
        this.nowKey = ''
        this.nowPage = ''
      }

      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          try {
            if (this.pageStore.has(key)) {
              const { ins }: { ins: Vue } = this.pageStore.get(key)
              ins.$destroy()
              if (this.aliveComponent.cache[key]) {
                this.aliveComponent.cache = null
                const index = this.aliveComponent.keys.indexOf(key)
                if (index > -1) {
                  this.aliveComponent.keys.splice(index, 1)
                }
              }
            }
            resolve()
          } catch (e) {
            reject(e)
          }
        })
      }).then(() => true, () => false)
    }

    mounted() {
      this.aliveComponent = this['_vnode'].componentInstance
    }

    getInstance(key: string): any {
      if (this.pageStore.has(key)) {
        return this.pageStore.get(key).ins
      }
      return undefined
    }

  }
</script>
