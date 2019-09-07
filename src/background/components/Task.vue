<template>
  <div :class="getTaskClass" @click="switchPage({ id: task.id })" class="task">
    <span>{{ task.task.name }}</span>
    <a-icon
      @click.stop="closePage({ id: task.id })"
      class="close-btn"
      type="cross"
      v-if="task.page.closeable !== false"/>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { IPageIns } from '@/background/interfaces/page.interface'
  import { mapActions, mapState } from 'vuex'

  @Component({
    name: 'Task',
    computed: {
      ...mapState('page', [
        'nowPageId'
      ])
    },
    methods: {
      ...mapActions('page', [
        'switchPage',
        'closePage'
      ])
    }
  })
  export default class Task extends Vue {
    @Prop()
    task: IPageIns

    get getTaskClass(): string {
      return this.task.id === this['nowPageId'] ? 'active' : 'inactive'
    }

  }
</script>

<style lang="less" scoped>
  .task {
    color: #333;
    background-color: #fff;
    border-radius: 2px;
    padding: 5px 12px;
    margin: 0 5px;
    cursor: pointer;
    transition: box-shadow .6s, color .2s;
    display: flex;
    align-items: center;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #007887;
    }

    &:hover {
      box-shadow: 0 3px 6px rgba(0, 0, 0, .18);
    }
  }

  .close-btn {
    margin-left: 5px;
    font-size: 12px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #555;
    transition: color .4s;
    transform: scale(.83333333) rotate(0deg);

    &:hover {
      color: #000;
    }
  }
</style>
