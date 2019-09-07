<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { PageManager } from '@/background/manager/page-manager.tsx'
  import { mapGetters, mapState } from 'vuex'

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
      if (this.pageManager) {
        if (this.nowPage['_isMounted'] === false) {
          this.pageManager.mountPage(this.nowPage)
        }
        // this.pageManager.show(this.nowPage)
      }

      if (this.nowPage && this.nowPage['_isVue']) {
        return this.nowPage['_vnode']
      }
    }
  })
  export default class Page extends Vue {
    pageManager: PageManager

    get nowPage(): Vue {
      return (this['nowPageIns'] || { ins: null }).ins
    }
  }
</script>
