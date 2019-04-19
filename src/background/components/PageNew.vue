<script lang="ts">
  import { CreateElement } from 'vue'
  import { dashboard } from '@/background/pages/dashboard/dashboard.config'

  function createComponentInstanceForVnode(
    vnode, // we know it's MountedComponentVNode but flow doesn't
    parent, // activeInstance in lifecycle state
    parentElm?,
    refElm?
  ) {
    var vnodeComponentOptions = vnode.componentOptions
    var options = {
      _isComponent: true,
      parent: parent,
      propsData: vnodeComponentOptions.propsData,
      _componentTag: vnodeComponentOptions.tag,
      _parentVnode: vnode,
      _parentListeners: vnodeComponentOptions.listeners,
      _renderChildren: vnodeComponentOptions.children,
      _parentElm: parentElm || null,
      _refElm: refElm || null
    }
    // check inline-template render functions
    var inlineTemplate = vnode.data.inlineTemplate
    if (inlineTemplate !== undefined && inlineTemplate !== null) {
      (<any>options).render = inlineTemplate.render;
      (<any>options).staticRenderFns = inlineTemplate.staticRenderFns
    }
    return new vnodeComponentOptions.Ctor(options)
  }

  export default {
    name: 'PageNew',
    abstract: true,
    render(createElement: CreateElement, context) {
      const node = createElement({
        name: 'Empty'
      })
      const vnode = this.$createElement(dashboard.page)
      console.log(this)
      const ins = createComponentInstanceForVnode(vnode, this['_vnode'])
      ins.$mount()
      console.log(node)
      vnode.componentInstance = ins
      console.log(ins)
      this.$nextTick(() => {
        console.log(vnode.componentInstance)
      })
      return vnode
    }
  }
</script>
