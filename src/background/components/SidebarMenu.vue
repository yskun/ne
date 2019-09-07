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
  import { IPageIns } from '@/background/interfaces/page.interface'

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
        'startPage'
      ])
    }
  })
  export default class SidebarMenu extends Vue {
    selectKeys: string[] = []
    nowKey: string = ''

    get shortcuts(): IMenu[] {
      return this.getAllShortcuts(this['menuList'])
    }

    getAllShortcuts(menuList: IMenu[]): IMenu[] {
      return menuList.reduce((shortcuts, now) => {
        if (!now.children) {
          shortcuts.push(now)
        } else {
          shortcuts.push(
            ...this.getAllShortcuts(now.children)
          )
        }
        return shortcuts
      }, [])
    }

    @Watch('nowPageIns')
    nowPageWatcher({ page }: IPageIns) {
      this.selectKeys = this.shortcuts
        .filter(s => s.page.type === page.type)
        .map(s => s.id)
    }

    selectMenu({ key }: { key: string }) {
      const shortcut = this.shortcuts.find(shortcut => shortcut.id === key)
      if (this.nowKey === key && shortcut.page.multiplePage === false) {
        return
      }
      this.nowKey = key
      if (shortcut) {
        this['startPage']({ page: shortcut.page })
      } else {
        throw new Error(`no shortcut find! key: ${key}`)
      }
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
