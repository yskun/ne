<template>
  <div>
    <component v-for="modal of modals" :key="modal.$id"
               :modal="modal"
               :is="modal.component"
               :config="modal.$config"
               :data="modal.data"/>
  </div>
</template>

<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator'

  @Component({
  name: 'ModalContainer',
  data() {
    return {
      modals: []
    }
  },
  mounted() {
    this.modals = this.$store.state.modals
  },
  watch: {
    '$store.state.modals'(modals) {
      this.modals = modals
    }
  }
  })
  export default class ModalContainer extends Vue {
  }
</script>

<style scoped>
</style>
