<template>
  <div class="view">
    <modal-container/>
    <sidebar :menu="menu"/>
    <div class="main-area">
      <top-nav :user="user" :menu="now.menu"/>
      <container/>
    </div>
  </div>
</template>

<script lang="ts">
  // @ is an alias to /src

  import Sidebar from '../components/home/sidebar.vue'
  import TopNav from '../components/home/top_nav.vue'
  import Container from '../components/home/container.vue'
  import ModalContainer from '../components/home/modal_container.vue'
  import { pageCenter } from '../components/home/page-center/page-center'
  import TaskBar from '../components/home/task-bar.vue'
  import { menuList } from '@/menu.config'
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
    user = {
      nickname: '',
      avatar: ''
    }

    menu = []

    now = {
      route: '',
      menu: pageCenter.nowPageList
    }

    created() {
      this.$store.commit('setMenu', )
      let instances = pageCenter.mountDefaultPage()
      if (instances.length > 0) {
        this.$store.commit('changePageById', instances[0].ins[0].$id)
      }
    }
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
