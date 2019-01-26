<template>
  <div>
    <component v-for="modal of modals" :key="modal.$id"
               :modal="modal"
               :is="modal.component"
               :config="modal.$config"
               :data="modal.data"/>
  </div>
</template>

<script>
import { pageCenter } from './page-center/page-center'

export default {
  name: 'ModalContainer',
  components: pageCenter.getComponent('modals', {}),
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
}
</script>

<style scoped>
</style>
