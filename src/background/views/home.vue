<template>
  <div class="view">
    <Sidebar/>
    <div class="main-area">
      <TopNav/>
      <Container/>
    </div>
  </div>
</template>

<script lang="ts">
  // @ is an alias to /src

  import Sidebar from '../components/Sidebar.vue'
  import TopNav from '../components/Navigation.vue'
  import Container from '../components/Container.vue'
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    components: {
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
