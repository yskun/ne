<template>
  <div class="menu">
    <a-menu mode="inline" :inlineCollapsed="collapsed" theme="dark" @click="selectMenu" v-model="selectKeys">
      <template v-for="(m,index) of menu">
        <a-menu-item :item="m" :key="m.name">
          <a-icon :type="m.icon"  class="sidebar-icon"/>
          <span>{{m.name}}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>

</template>

<script lang="ts">
export default {
  name: 'SidebarMenu',
  props: {
    menu: Array,
    isHeadMenu: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectKeys: [],
    }
  },
  computed: {
    collapsed() {
      return this.$store.state.menuCollapsed
    }
  },
  methods: {
    selectMenu(menuItem) {
      if (menuItem.item && menuItem.item.$attrs.item) {
        let item = menuItem.item.$attrs.item
        this.$store.commit('changePageByType', item.page)
      }
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
    }
  },
  mounted(){
    console.log(this.menu)
  },
  watch: {
    '$store.state.page'(page) {
      if (page) {
        let menu = this.findPage(this.menu, page.type)
        if (menu) {
          this.selectKeys = [menu.name]
        }
      }
    }
  }
}
</script>

<style lang="less">
.sidebar-icon{
  background: inherit!important;
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
