<template>
  <div @click="click">
    木有找到页面
  </div>
</template>

<script>
export default {
  name: 'Error404',
  methods: {
    click(){
      console.log(`404`)
    }
  }
}
</script>

<style scoped>
</style>
