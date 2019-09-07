<template>
  <div class="task-bar">
    <div class="list">
      <Task :key="task.key" :task="task" v-for="task of taskList"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Task from '@/background/components/Task.vue'
  import { mapGetters } from 'vuex'

  @Component({
    name: 'Tasker',
    components: { Task },
    computed: {
      ...mapGetters('page', [
        'taskList'
      ])
    }
  })
  export default class Tasker extends Vue {
  }
</script>

<style lang="less" scoped>
  .task-bar {
    flex: 1;
    overflow: hidden;
    display: flex;
    padding: 0 10px;
  }

  .list {
    display: flex;
    align-items: center;
  }
</style>
