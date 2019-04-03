# Ne 中台管理系统

使用Vue 2.6.x、ant-design-vue(Ant Design)构建

## 运行、开发

npm

```

开发：npm serve
发布：npm build
```
yarn（推荐）

```

开发：yarn serve
发布：yarn build
```
# 项目结构

```

.
|--src 项目源码
|   |
|   |--assets 资源素材
|   |   |-- icon 图标，适用于阿里巴巴图标库
|   |   |-- ... 其他素材
|   |
|   |--background 后台系统主源码
|   |   |-- components 项目骨架
|   |   |-- service 通讯服务
|   |   |-- views 主体框架页面
|   |
|   |--pages **后台页面**
|       |-- list.ts 后台页面列表
|
|--public web路径
|
|-- ...
```

**项目在持续开发中，下述内容已过时**

# 编写page后台页面
page页面存放在 ./src/page中，每个page对应一个单独的功能页面，每个page可以拥有多个子页面及模态框
page的推荐目录格式如下：

```
.
|-- pages
|     |-- my-page
|            |-- my-page.config.js   **page的配置文件**
|            |-- my-page.page.vue    **page的主页面，使用page作为后缀**
|            |-- my-page.modal.vue   **page的模态框文件，使用modal作为后缀**
|
|-- list.ts page列表
```

**page页面需在list.js注册后，才能使用**

## 快速开始
每个page页面均需要一个配置文件，用于page页面的引入和参数的设置。
首先创建一个config文件，如下所示
```
# my-page.config.js
# 更多参数详见配置文件章节

export default {
  type: 'myPage',       // page的识别字符，在项目内应唯一存在
  name: '我的页面',      // page的名称，在项目内应唯一存在
  icon: 'global',       // page的图标
  pages: [              // page的子页面，在数组的第一个子页面为主页面
    {
      name: 'myPage',   // 定义该页面组件的名称
      component: () => import('./my-page.page') // vue组件路径
    }
  ]
}
```
在项目中，使用了Ant Design的一个Vue实现版本作为UI库，因此在没有特殊的需求下，为了保持项目的一致性，请使用`ant-design-vue`作为UI库实现功能。
在配置好文件后，还需要将配置文件引入list.js文件中。如下所示
```
# list.ts
import myPage from "./my-page/my-page.config";

export const pageList = [
  myPage,
  ...
]
```
接下来，就可以和普通vue组件一样，编写页面了。
```
# my-page.page.vue

<template>
  <a-card>hello world</a-card>
</template>

<script>
export default {
  name: 'my-page'
}
</script>

<style lang="less" scoped>
</style>

```

## 页面配置
页面配置是一个对象，具体属性如下表所示：

|属性|必要项|类型|解释|默认值|
|------|--------|-----|------|--------|
|type|是|string|用于识别页面的字段，应具有唯一性|无|
|name|是|string|页面的名称|无|
|logo|否|string|页面的图标，目前仅支持iview3原生图标|无|
|pages|是|array|页面的包含的组件，当仅有一个组件时，不显示子页面切换器|无|
|modals|否|array|页面包含的模态框|无|
|store|否|object \ function|存储单元，store内的内容在切换页面后不被消除|{}|
|noToTop|否|boolean|不显示返回页顶的按钮|false|
|multiplePage|否|boolean|允许多例页面|false|
|closeable|否|boolean|是否能关闭该页面|false|
|noTab|否|boolean|是否在任务栏显示|false|
|defaultPage|否|boolean|是否为默认页，当该值为真时，将在页面加载时，加载当前该模块|false|

页面配置中，可以添加自定义的属性，该属性将会以props[config]的形式注入到page的所有子页面及模态框中。
注：
1. ***模态框不会映射store的内容***
2. store存储单元将会为每个页面实例生成store实例，若store为object，则每个实例实际上将会共用一个store实例。因此，除非有特殊需求，store应该为function并返回相应的object

```

export default {
  store: function() {
    return {
     sth: ''
    }
  },
  ...
}
```

## Page组件
### Props 将会被注入的属性
|参数|解释|
|-----|------|
|config|在配置文件中自定义的参数|
|data|store存储单元|
### Method
通过在page中调用this.$emit('method',{})调用项目中存在的方法。
可以传入的属性：

|参数|解释|
|-----|------|
|type|方法类型，目前支持```modal```|
|data|要传递的数据|
|component|目标modal的"name"|

## Modal组件
### Props 将会被注入的属性
|参数|解释|
|-----|------|
|modal|管理模态框的Objcet|
|config|在配置文件中自定义的参数|
|data|传递的数据|

## Http服务
在项目内，封装了一个基于axios的http请求类（Http），包含了常用的http方法，GET、POST、PUT、DELETE，具体方法参数如下：

### 方法
|方法|解释|
|-----|------|
|setConfig|设置axios配置（lockConfig为真时不能修改）|
|get|GET方法|
|post|POST方法|
|put|PUT方法|
|del|DELETE方法|
|sendFile|发送文件|

setConfig：

|参数|必要项|类型|解释|
|-----|---------|-----|------|
|config|是|objcet|axios配置（lockConfig为真时不能修改）|

get:

|参数|必要项|类型|解释|
|-----|---------|-----|------|
|url|是|string|目标地址|
|param|否|objcet|params|
|config|否|objcet|axios配置（lockConfig为true时，baseUrl不能修改）|

post:

|参数|必要项|类型|解释|
|-----|---------|-----|------|
|url|是|string|目标地址|
|body|否|objcet|body|
|config|否|objcet|axios配置（lockConfig为true时，baseUrl不能修改）|

put:

|参数|必要项|类型|解释|
|-----|---------|-----|------|
|url|是|string|目标地址|
|body|否|objcet|body|
|config|否|objcet|axios配置（lockConfig为true时，baseUrl不能修改）|

delete:

|参数|必要项|类型|解释|
|-----|---------|-----|------|
|url|是|string|目标地址|
| param |否|objcet| params |
|config|否|objcet|axios配置（lockConfig为true时，baseUrl不能修改）|

sendFile:

|参数|必要项|类型|解释|
|-----|---------|-----|------|
|url|是|string|目标地址|
| data |否|objcet| body |
|config|否|objcet|axios配置（lockConfig为true时，baseUrl不能修改）|

此外，若无特殊需求(如：自定义header,设置baseUrl)，可以直接使用http，而无需new Http()

## 全局变量
提供一些环境变量，只读不可写

### $production
是否为正式环境。正式：true，测试：false

# 注意事项

## ant-design-vue 项目UI库

ant-design-vue是ant design 3.x的vue实现版本。
目前项目内使用的版本为 ^1.0.3。
项目全局引入了该UI库下的全部组件，因此在编写Page页面时无需单独引入ant-design-vue的组件。

## modal模态框组件
在编写modal模态框组件时，请在template中使用`a-modal`组件。
*modal型组件在是在modalContainer中展现的，与页面容器container不同的是，modalContainer是一个全局的页面容器，它位于Home组件的首个元素。但并没有为每个模态框包裹modal组件，因此需要在每个modal组件中，自行实现modal的功能，及显示的管理。*

## 命名规范

整体使用串烧式命名规则，如：ask-homework
文件夹 以模块名命名，如ask-homework
后台页面  使用后缀.page.* ，如ask-homework.page.vue
模态框 使用后缀.modal.* ，如ask-homework-do-sth.modal.vue
服务类 使用后缀.service.* ，如ask-homework.service.js

## 防止样式污染
```
# wrong 错误的写法
<style>
...
</style>

# right 正确的写法
<style scoped>
</style>
```
在Vue中，组件的样式不会随着组件的移除而被移除。因此，若不适用Scoped修饰组件样式，很有可能会在影响其他组件的样式，因此，在添加style时，请加入scoped使样式局限于组件中。若需要影响其子组件的样式，请参考下述文档：
[Scoped CSS](https://vue-loader.vuejs.org/zh/guide/scoped-css.html)

## 尚未实现功能
### 子页面切换
目前尚未实现子页面切换的方法，但在实际情况中，其字页面组件已经注册在页面容器container中。因此，可以使用一个hack方法，this.$parent.componet = '子页面名'，强制更换页面。（不推荐）

# 参考文档
## vue
https://cn.vuejs.org/v2/guide/
## ant-design-vue
https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/
