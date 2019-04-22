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
  return typeof func === 'function' && typeof func.prototype === 'object';
}
