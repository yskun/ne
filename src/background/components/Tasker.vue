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
  import { mapState } from 'vuex'
  import { IPageIns } from '@/background/interfaces/page.interface'

  @Component({
    name: 'Tasker',
    components: { Task },
    computed: {
      ...mapState('page', [
        'mountedPageList'
      ])
    }
  })
  export default class Tasker extends Vue {
    get taskList() {
      return (<IPageIns[]>this['mountedPageList'])
        .filter(page => page.page.noTask !== true)
    }
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
