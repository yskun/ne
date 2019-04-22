<script lang="ts">
  import vue, { CreateElement, VueConstructor } from 'vue'
  import { dashboard } from '@/background/pages/dashboard/dashboard.config'
  import { createComponentInstanceForVnode, isAsyncComponentFunction } from '@/background/methods/page.method'
  import uuid from 'uuid/v1'
  import { IPageIns } from '@/background/interfaces/page.interface'

  const store = new Map()

  export default {
    name: 'PageNew',
    abstract: true,
    data() {
      return {
        nowVnode: ''
      }
    },
    methods: {
      async create({ method, page }) {
        let pageFunc
        if (isAsyncComponentFunction(page)) {
          const _module = await page()
          pageFunc = _module.default
        } else {
          pageFunc = page
        }

        console.dir(pageFunc)
        const vnode = this.$createElement(pageFunc)
        vnode.key = uuid()
        const ins = createComponentInstanceForVnode(vnode, this)
        vnode.componentInstance = ins
        const pageIns = {
          ins,
          key: vnode.key,
          vnode
        }
        this.nowVnode = vnode
        this.$emit('result', {
          method,
          result: pageIns
        })
      },
      mount() {
      },
      switch({ key, method }) {
        if (!key) {

        }
      },
      remove() {

      }
    },
    mounted() {
      this.create({
        method: 'create',
        page: dashboard.page
      })

    },
    render() {
      if (this.nowVnode) {
        return this.nowVnode
      }

    }
  }
</script>
