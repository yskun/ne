<template>
  <div class="top-nav nav">
    <div @click="changeMenuStatus" class="menu">
      <a-icon :type="collapsed ? 'right' : 'left'"></a-icon>
    </div>
    <div class="menu">
      <a-icon type="loading"></a-icon>
    </div>
    <task-bar :now-pages="menu"/>
  </div>
</template>

<script lang="ts">
  import TaskBar from './task-bar.vue'

  export default {
    name: 'TopNav',
    components: { TaskBar },
    props: {
      user: Object,
      nowPages: Array,
      menu: Array
    },
    computed: {
      collapsed() {
        return this.$store.state.menuCollapsed
      }
    },
    methods: {
      changeMenuStatus() {
        this.$store.commit('changeMenuCollapsed')
      }
    }
  }
</script>

<style lang="less" scoped>
  .nav {
    display: flex;
  }

  .top-nav {
    width: 100%;
    max-width: 100%;
    height: 65px;
    color: #fff;
    background-color: #00bcd4;
    font-weight: 600;
    z-index: 1000;
    user-select: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.13);
  }

  .nav-bar {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 10px;
    overflow: hidden;
  }

  .menu {
    height: 100%;
    width: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    cursor: pointer;
  }
</style>
