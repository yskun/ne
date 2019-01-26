<template>
  <div class="sidebar" :style="{'width': collapsed ? '81px': '280px'}">
    <div class="logo-area">
      {{collapsed ? collapseTitle : title}}
    </div>
    <div style="margin-top: -4px">
      <sidebar-menu :menu="menu"></sidebar-menu>
    </div>
  </div>
</template>

<script lang="ts">
  import { pageCenter } from './page-center/page-center'
  import SidebarMenu from '../common/sidebarMenu.vue'

  export default {
    name: 'Sidebar',
    components: { SidebarMenu },
    props: {
      menu: Array,
      title: {
        default: 'Ne. 开发中心终端'
      },
      collapseTitle: {
        default: 'Ne.'
      }
    },
    data() {
      return {
        nowMenu: {},
        menuIns: {}
      }
    },
    computed: {
      collapsed() {
        return this.$store.state.menuCollapsed
      }
    },
    methods: {
      itemClick(m) {
        if (this.setNowMenuStatus) {
          this.setNowMenuStatus = false
          return
        }
        m = m.pop()
        if (!m) {
          return
        }
        this.$store.commit('changePageByType', m.page)
      },
      setNowMenu(m) {
        if (this.nowMenu.name === m.name) {
          return
        }
        this.setNowMenuStatus = true
        this.menuIns.setCheck({
          name: m.name
        })
      },
      findPage(source, target) {
        let mTarget

        function find(source) {
          return source.find(m => {
            if (target === m.page) {
              mTarget = m
              return true
            }

            if (m.children) {
              return find(m.children)
            }
          })
        }

        find(source)
        return mTarget
      },
      calDefaultPage() {
        if (!(pageCenter.defaultPageList.length > 0 && this.menu.length > 0)) {
          return
        }
        let defaultPage = pageCenter.defaultPageList[0]
        let mTarget = this.findPage(this.menu, defaultPage.type)
        if (mTarget) {
          this.setNowMenu(mTarget)
          console.log(this.nowMenu)
        }
      }
    },
    watch: {
      menu() {
        this.calDefaultPage()
      },
      '$store.state.page'(page) {
        if (page) {
          let menu = this.findPage(this.menu, page.type)
          if (menu) {
            // this.setNowMenu(menu)
            this.nowMenu = menu
          }
        }
      }
    },
    mounted() {
      this.menuIns = this.$refs.menuIns
    }
  }
</script>

<style lang="less" scoped>
  .logo-area {
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 1;
    font-weight: bold;
    word-break: keep-all;
    white-space: nowrap;
  }

  .sidebar {
    color: #fff;
    background-color: #001529;
    user-select: none;
    transition: width 225ms cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  .item {
    border-left: 5px solid #263238;
    background-color: #263238;
    padding: 13px 18px;
    font-size: 14px;
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .item:hover {
    border-left: 5px solid #313e45;
    background-color: #313e45;
  }

  .item-active {
    border-left: 5px solid #c4001d;
  }
</style>
