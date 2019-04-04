<template>
  <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con">
    <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
      <!--<transition-group name="taglist-moving-animation">-->
        <!--<a-tag-->
          <!--v-for="item in pageTagsList"-->
          <!--v-if="!item.noTab"-->
          <!--ref="tagsPageOpened"-->
          <!--:key="item.$id"-->
          <!--:itemid="item.$id"-->
          <!--@close="closePage(item)"-->
          <!--@click.native="linkTo(item)"-->
          <!--:closable="item.closeable !== false"-->
          <!--:color="item.$id===currentPageId?'cyan-inverse':''"-->
        <!--&gt;{{ item.name | tagName(item) }}-->
        <!--</a-tag>-->
      <!--</transition-group>-->
    </div>
  </div>
</template>

<script>

export default {
  name: 'tagPages',
  data() {
    return {
      currentPageId: 0,
      tagBodyLeft: 0,
      refsTag: [],
      tagsCount: 1
    }
  },
  props: {
    pageTagsList: Array
  },
  filters: {
    tagName(content, item) {
      let name = content
      if (item.multiplePage) {
        name += ' - ' + item.instanceNo
      }
      return name
    }
  },
  methods: {
    closePage(item) {
      console.log(`on Close`)
      if (this.currentPageId === item.$id) {
        this.linkTo(
          this.pageTagsList.find(p => p.defaultPage) || this.pageTagsList[0]
        )
      }
      this.clickByStop = true
    },
    linkTo(item) {
      if (this.clickByStop) {
        this.clickByStop = false
        return
      }
      this.$store.commit('changePageById', item.$id)
    },
    handlescroll(e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      let left = 0
      if (delta > 0) {
        left = Math.min(0, this.tagBodyLeft + delta)
      } else {
        if (
          this.$refs.scrollCon.offsetWidth - 100 <
          this.$refs.scrollBody.offsetWidth
        ) {
          if (
            this.tagBodyLeft <
            -(
              this.$refs.scrollBody.offsetWidth -
              this.$refs.scrollCon.offsetWidth +
              100
            )
          ) {
            left = this.tagBodyLeft
          } else {
            left = Math.max(
              this.tagBodyLeft + delta,
              this.$refs.scrollCon.offsetWidth -
                this.$refs.scrollBody.offsetWidth -
                100
            )
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
      this.tagBodyLeft = left
    },
    moveToView(tag) {
      if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10
      } else if (
        tag.offsetLeft + 10 > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth <
          -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          this.$refs.scrollCon.offsetWidth -
            100 -
            tag.offsetWidth -
            tag.offsetLeft -
            20
        )
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) +
          20
        )
      }
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.refsTag = this.$refs.tagsPageOpened
    //   this.refsTag.forEach((item, index) => {
    //     if (this.$store.state.page.$id === item.$attrs.itemid) {
    //       let tag = this.refsTag[index].$el
    //       this.moveToView(tag)
    //     }
    //   })
    // })
    // this.tagsCount = this.pageTagsList.length
    // this.currentPageId = this.$store.state.page.$id || 0
  },
  watch: {
    '$store.state.page'(page) {
      let id = page.$id || ''
      this.currentPageId = page.$id
      this.$nextTick(() => {
        this.refsTag.find((item, index) => {
          if (id === item.$attrs.itemid) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
            return true
          }
        })
      })
      this.tagsCount = this.pageTagsList.length
    }
  }
}
</script>

<style lang="less" scoped>
  .tags-outer-scroll-con {
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    user-select: none;
  }

  .tags-inner-scroll-body {
    position: absolute;
    padding: 12px 10px;
    overflow: visible;
    white-space: nowrap;
    transition: left 0.3s ease;
  }

  .tag /deep/ {
    font-size: 16px;
  }
</style>

<style lang="less">
  .tags-inner-scroll-body {
    .ant-tag {
      font-size: 14px;
      padding: 2px 8px;
      height: auto;
    }
  }
</style>

