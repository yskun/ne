<template>
  <div @click="click">
    这是控制台w {{test}} {{cc}}
    <ul>
      <li v-for="l in list">{{l}}</li>
    </ul>
  </div>
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'

  @Component({
    props: { test: Number, cc: Object }
  })
  export default class Dashboard extends Vue {

    pageOptions: {}

    data: 2

    list = []

    click() {
      console.log(`这是控制台`)
      this.list.push(`test`)
      this.$emit('cess', 123)
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
