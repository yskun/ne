<template>
  <a-locale-provider :locale="zhCn">
    <div id="app" v-cloak>
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<style lang="less">
body {
  line-height: 20px;
  font-weight: 400;
  font-size: 0.9375rem;
  margin: 0;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.view {
  width: 100vw;
  min-height: 100vh;
  height: 100%;
}

.clickable {
  cursor: pointer;
  user-select: none;
}

.ivu-tag-dot {
  line-height: 31px !important;
}

.ivu-tag {
  font-size: 14px !important;
}
</style>
<script lang="ts">
import zhCn from 'ant-design-vue/lib/locale-provider/zh_CN'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'app'
})
export default class App extends Vue {
  zhCn = zhCn
}
</script>
