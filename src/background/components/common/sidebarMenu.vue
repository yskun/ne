<template>
  <div class="menu">
    <a-menu mode="inline" :inlineCollapsed="collapsed" theme="dark" @click="selectMenu" v-model="selectKeys">
      <template v-for="m of menu">
        <a-menu-item v-if="!m.children" :item="m" :key="m.id">
          <a-icon :type="m.icon" class="sidebar-icon"/>
          <span>{{m.name}}</span>
        </a-menu-item>
        <sub-menu v-else :menu="m" :key="m.id"/>
      </template>
    </a-menu>
  </div>

</template>

<script lang="ts">

  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { mapState } from 'vuex'
  import SubMenu from './subMenu.vue'

  @Component({
    name: 'SidebarMenu',
    components: {
      SubMenu
    },
    computed: {
      ...mapState('menu', {
        menuList: 'menuList',
        collapsed: 'menuCollapsed'
      }),
      ...mapState('page', [
        'nowPageId'
      ])
    }
  })
  export default class SidebarMenu extends Vue {
    selectKeys = []

    @Watch('nowPageId')
    nowPageWatcher(page) {
      if (page) {
        let menu = this.findPage(this['menuList'], page.type)
        if (menu) {
          this.selectKeys = [menu.name]
        }
      }
    }

    selectMenu(menuItem) {
      if (menuItem.item && menuItem.item.$attrs.item) {
        let item = menuItem.item.$attrs.item
        this.$store.commit('changePageByType', item.page)
      }
    }

    findPage(source, target) {
      let mTarget = void 0

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
    }

  }

</script>

<style lang="less">
  .sidebar-icon {
    background: inherit !important;
  }

  .menu {
    .ant-menu-inline,
    .ant-menu-vertical,
    .ant-menu-vertical-left {
      border-right: none;
    }
  }

  .menu .ant-menu-item {
    font-size: 16px;
    line-height: 45px;
    height: 45px;
  }

  .menu .ant-menu-submenu-title {
    font-size: 16px !important;
    line-height: 45px;
    height: 45px;
  }

  .menu {
    border-right: none !important;
  }
</style>
