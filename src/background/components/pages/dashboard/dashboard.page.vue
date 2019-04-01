<template>
  <div @click="click">
    这是控制台
  </div>
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'

  @Component({
    name: 'Dashboard'
  })
  export default class Dashboard extends Vue {

    pageOptions: {}

    data: 2

    click() {
      console.log(`这是控制台`)
    }

    mounted() {
      console.log(`Dashboard: is run mounted`, this)
    }

    activated() {
      console.log(`Dashboard: is run onShow`, this)
    }

    deactivated() {
      console.log(`Dashboard: is run onHide`, this)
    }
  }
</script>

<style scoped>
</style>
