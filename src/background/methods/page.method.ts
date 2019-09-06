import { Vue } from 'vue/types/vue'

export function createComponentInstanceForVnode(
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

export function isAsyncComponentFunction(func) {
  return func instanceof Function && typeof func.options !== 'object'
}

export function callHook(vm: Vue, hook: string) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm)
      } catch (e) {
        const hooks = vm.$options.errorCaptured
        if (hooks) {
          for (let i = 0; i < hooks.length; i++) {
            hooks[i].call(vm, e, vm, `${hook} hook`)
          }
        }
      }
    }
  }
  if (vm['_hasHookEvent']) {
    vm.$emit('hook:' + hook)
  }
}


