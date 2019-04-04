<template>
  <div class="sidebar" :style="{'width': collapsed ? '81px': '280px'}">
    <div class="logo-area">
      {{collapsed ? collapseTitle : title}}
    </div>
    <div style="margin-top: -4px">
      <sidebar-menu/>
    </div>
  </div>
</template>

<script lang="ts">
  import SidebarMenu from '@/background/components/SidebarMenu.vue'
  import { Vue, Component } from 'vue-property-decorator'
  import { mapState } from 'vuex'

  @Component({
    name: 'Sidebar',
    components: { SidebarMenu },
    computed: {
      ...mapState([
        'title',
        'collapseTitle'
      ]),
      ...mapState('menu', {
        collapsed: 'menuCollapsed'
      })
    }
  })
  export default class SideBar extends Vue {

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
