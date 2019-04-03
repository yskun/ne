<template functional>
  <a-sub-menu :key="props.menu.id">
    <a-icon :type="m.icon" class="sidebar-icon"/>
    <span>{{m.name}}</span>
    <template v-for="(m,index) of props.menu.children">
      <a-menu-item v-if="!m.children" :item="m" :key="m.id">
        <a-icon :type="m.icon" class="sidebar-icon"/>
        <span>{{m.name}}</span>
      </a-menu-item>
      <sub-menu v-else :menu="m" :key="m.id"/>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { IMenu } from '@/background/menu/menu.interface'

  @Component({
    name: 'subMenu'
  })
  export default class SubMenu extends Vue {
    @Prop()
    menu: IMenu
  }
</script>

<style scoped>

</style>
