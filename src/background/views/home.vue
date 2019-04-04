<template>
  <div class="view">
    <modal-container/>
    <sidebar/>
    <div class="main-area">
      <top-nav/>
      <container/>
    </div>
  </div>
</template>

<script lang="ts">
  // @ is an alias to /src

  import Sidebar from '../components/Sidebar.vue'
  import TopNav from '../components/home/top_nav.vue'
  import Container from '../components/Container.vue'
  import ModalContainer from '../components/home/modal_container.vue'
  import TaskBar from '../components/home/task-bar.vue'
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    components: {
      TaskBar,
      ModalContainer,
      Container,
      TopNav,
      Sidebar
    }
  })
  export default class Home extends Vue {
  }

</script>

<style lang="less" scoped>
  .view {
    display: flex;
  }

  .main-area {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
</style>
