<template>
  <div @click="click">
    这是控制台
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {
    page: Object
  },
  data() {
    return {
      data: 2
    }
  },
  methods: {
    click(){
      console.log(`这是控制台`)
    }
  },
  mounted(){
    console.log(this)
  }
}
</script>

<style scoped>
</style>
