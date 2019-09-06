<template>
  <div @click="click" ref="test">
    木有找到页面
  </div>
</template>

<script>
  export default {
    name: 'Error404',
    data() {
      return {}
    },
    methods: {
      click() {
      }
    },
    activated() {
      console.log(`404`)
    }
  }
</script>

<style scoped>
</style>
