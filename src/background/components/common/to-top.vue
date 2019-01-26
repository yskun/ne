<template>
  <div class="ant-back-top to-top" @click="back" v-show="toTop">
    <slot>
      <div class="ant-back-top-content">
        <div class="ant-back-top-icon"></div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'to-top',
  props: {
    target: {},
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      toTop: false
    }
  },
  methods: {
    back() {
      this.scrollTop(this.target, this.target.scrollTop, 0, 1000)
    },
    scrollTop(el, from = 0, to, duration = 500, endCallback) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame =
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            return window.setTimeout(callback, 1000 / 60)
          }
      }
      const difference = Math.abs(from - to)
      const step = Math.ceil((difference / duration) * 50)

      function scroll(start, end, step) {
        if (start === end) {
          endCallback && endCallback()
          return
        }

        let d = start + step > end ? end : start + step
        if (start > end) {
          d = start - step < end ? end : start - step
        }

        if (el === window) {
          window.scrollTo(d, d)
        } else {
          el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
      }
      scroll(from, to, step)
    },
    handleScroll() {
      this.toTop = this.target.scrollTop >= this.height
    },
    bindTarget() {
      if (this.target) {
        this.target.addEventListener('scroll', this.handleScroll, false)
        window.addEventListener('resize', this.handleScroll, false)
      }
    },
    removeTarget(target) {
      if (target) {
        target.removeEventListener('scroll', this.handleScroll, false)
        window.removeEventListener('resize', this.handleScroll, false)
      }
    }
  },
  mounted() {
    this.bindTarget()
  },
  watch: {
    target(newVal, oldVal) {
      this.removeTarget(oldVal)
      this.bindTarget()
    }
  },
  destroyed() {
    this.removeTarget(this.target)
  }
}
</script>

<style lang="less" scoped>
.to-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: block;
}
</style>
