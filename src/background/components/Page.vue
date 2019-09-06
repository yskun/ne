<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { PageManager } from '@/background/manager/page-manager.tsx'
  import Dashboard from '@/background/pages/dashboard/dashboard.page.vue'
  import Error404 from '@/background/pages/Error404/error404.page.vue'

  /**
   * 用来管理页面数据
   */

  @Component({
    name: 'Page',
    render(r) {
      if (this.pageManager) {
        if (this.nowPage['_isMounted'] === false) {
          this.pageManager.mountPage(this.nowPage)
        }
        this.pageManager.show(this.nowPage)
      }

      if (this.nowPage['_isVue']) {
        return this.nowPage['_vnode']
      }
    }
  })
  export default class Page extends Vue {
    pageManager: PageManager

    nowPage: any = {}

    test: any

    async mounted() {
      const cc = { ces: 11 }
      this.pageManager = PageManager.createManager()
      const result = await this.pageManager.create(Dashboard, {
        on: {
          cess(value) {
            console.log(value)
          }
        },
        data: {
          cc
        }
      })
      console.log(cc)
      this.nowPage = result.ins
      this.test = this.nowPage

      setTimeout(async () => {
        const { ins } = await this.pageManager.create(Error404)
        this.nowPage = ins
        setTimeout(() => {
          console.log(result.ins)
          this.nowPage = this.test
        }, 1000)
      }, 4000)
    }
  }
</script>
