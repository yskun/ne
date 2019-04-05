<template functional>
  <a-sub-menu :key="props.menu.id">
    <span slot="title">
      <a-icon :type="props.menu.icon" class="sidebar-icon"/>
      <span>{{props.menu.name}}</span>
    </span>
    <template v-for="m of props.menu.children">
      <a-menu-item v-if="!m.children" :item="m" :key="m.id">
        <a-icon :type="m.icon" class="sidebar-icon"/>
        <span>{{m.name}}</span>
      </a-menu-item>
      <sub-menu v-else :menu="m" :key="m.id"/>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { IMenu } from '@/background/interfaces/menu.interface'

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
