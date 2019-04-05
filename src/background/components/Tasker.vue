<template>
  <div class="task-bar">
    <tag-pages :pageTagsList="nowPages"/>
  </div>
</template>

<script>
  import TagPages from './common/tag_pages'

  export default {
    name: 'Tasker',
  components: {
    TagPages
  },
  props: {
    nowPages: Array
  }
}
</script>

<style lang="less" scoped>
.task-bar {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}
</style>
