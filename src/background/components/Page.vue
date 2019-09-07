<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { PageManager } from '@/background/manager/page-manager.tsx'
  import { mapGetters, mapState } from 'vuex'
  import Dashboard from '@/background/pages/dashboard/dashboard.page.vue'

  /**
   * 用来管理页面数据
   */

  @Component({
    name: 'Page',
    computed: {
      ...mapState('page', ['pageManager']),
      ...mapGetters('page', ['nowPageIns'])
    },
    render(r) {
      console.log(this.nowPage)
      if (!this.nowPage) {
        return
      }

      if (!this.nowPage['_isVue']) {
        return
      }

      console.log(this.nowPage, this.nowPage['_isMounted'])
      if (this.nowPage['_isMounted'] === false) {
        console.log(`is run`)
        this.pageManager.mountPage(this.nowPage)
      }
      this.pageManager.show(this.nowPage)

      return this.nowPage['_vnode']
    }
  })
  export default class Page extends Vue {
    pageManager: PageManager

    get nowPage(): Vue {
      return (this['nowPageIns'] || { ins: null }).ins
    }


    async mounted() {
      const { ins } = await this.pageManager.create(Dashboard)
      // this.nowPage = ins
      console.log(ins)
    }
  }
</script>
