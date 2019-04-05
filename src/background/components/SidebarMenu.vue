<template>
  <div class="menu">
    <a-menu mode="inline" :inlineCollapsed="collapsed" theme="dark" @click="selectMenu" v-model="selectKeys">
      <template v-for="m of menuList">
        <a-menu-item v-if="!m.children" :item="m" :key="m.id">
          <a-icon :type="m.icon" class="sidebar-icon"/>
          <span>{{m.name}}</span>
        </a-menu-item>
        <SubMenu :key="m.id" :menu="m" v-else/>
      </template>
    </a-menu>
  </div>

</template>

<script lang="ts">

  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { mapActions, mapGetters, mapState } from 'vuex'
  import SubMenu from './SubMenu.vue'
  import { menu } from '@/background/stores/menu.store'
  import { IMenu } from '@/background/interfaces/menu.interface'
  import { IPageIns, IPageOptions } from '@/background/interfaces/page.interface'

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
        'mountedPageList'
      ]),
      ...mapGetters('page', [
        'nowPage'
      ])
    },
    methods: {
      ...mapActions('page', [
        'switchPage',
        'mountPage'
      ])
    }
  })
  export default class SidebarMenu extends Vue {
    selectKeys: string[] = []
    shortcuts: IMenu[] = []
    nowKey: string = ''

    @Watch('nowPage')
    nowPageWatcher({ page }: IPageIns) {
      this.selectKeys = this.shortcuts
        .filter(s => s.page.type === page.type)
        .map(s => s.id)
    }

    @Watch('menuList', { immediate: true })
    menuListWatcher(menuList: IMenu[]) {
      this.shortcuts = []
      this.getAllShortcuts(menuList)
    }

    getAllShortcuts(menuList: IMenu[]) {
      menuList.forEach(m => {
        if (!m.children) {
          this.shortcuts.push(m)
        } else {
          this.getAllShortcuts(m.children)
        }
      })
    }

    selectMenu({ key }: { key: string }) {
      if (this.nowKey === key) {
        return
      }
      this.nowKey = key
      const shortcut = this.getShortcut(key)
      if (shortcut) {
        this['switchOrMountPage']({ page: shortcut.page })
      } else {
        throw new Error(`no shortcut find! key: ${key}`)
      }
    }

    switchOrMountPage({ page }: { page: IPageOptions }) {
      if (page.multiplePage === false) {
        const result = this['mountedPageList'].find(p => p.page.type === page.type)
        if (result) {
          return this['switchPage']({ key: result.key })
        }
      }
      return this['mountPage']({ page })
    }


    getShortcut(id: string) {
      return this.shortcuts.find(shortcut => shortcut.id === id)
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
