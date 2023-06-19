import type { RendererOptions } from '@vue/runtime-core'
import { Collection, Feature } from 'ol'
import Map from 'ol/Map'
import { Geometry } from 'ol/geom'
import BaseLayer from 'ol/layer/Base'
import Layer from 'ol/layer/Layer'
import Source from 'ol/source/Source'
import VectorSource from 'ol/source/Vector'
import LayerGroup from 'ol/layer/Group'
import { catalogue } from './catalogue'
import type { BaseObjectConstructor, OlBaseObject } from './types'
import { isHTMLTag, isInstanceof } from './utils'

let map: Map | null = null

export const option: RendererOptions<OlBaseObject | null, OlBaseObject | null> = {
  createElement(type, _isSVG, _isCustomizedBuiltIn, props) {
    if (!props)
      props = {}
    let args = [props]
    if (props.args)
      args = Array.from(props.args)

    if (type === 'template')
      return null
    if (isHTMLTag(type))
      return null
    const name = type.replace(/^Ol/, '')

    const target = name.split('.').reduce((target, p) => (target as any)[p], catalogue.value) as unknown as BaseObjectConstructor
    if (!target) {
      // TODO(enpitsulin): error logger
      console.error(`${name} is undefined`)
    }
    const instance = Reflect.construct(target, args)
    return instance
  },
  insert(el, parent, anchor) {
    if (!el || !parent)
      return
    if (isInstanceof(parent, Map) && !map)
      map = parent as unknown as Map

    if (isInstanceof(parent, Map) && isInstanceof(el, BaseLayer)) {
      parent.addLayer(el)
      // @ts-expect-error: internal usage
      el.__removeFn = () => parent.removeLayer(el)
      // @ts-expect-error: internal usage
      el.parent = parent
    }

    if (isInstanceof(parent, Layer) && isInstanceof(el, Source)) {
      parent.setSource(el)
      // @ts-expect-error: internal usage
      el.__removeFn = () => parent.setSource()
      // @ts-expect-error: internal usage
      el.parent = parent
    }

    if (isInstanceof(parent, LayerGroup) && isInstanceof(el, Layer)) {
      parent.getLayers().push(el)
      // @ts-expect-error: internal usage
      el.__removeFn = () => parent.getLayers().remove(el)
      // @ts-expect-error: internal usage
      el.parent = parent
    }

    if (isInstanceof(parent, Collection)) {
      parent.push(el)
      // @ts-expect-error: internal usage
      el.__removeFn = () => parent.remove(el)
      // @ts-expect-error: internal usage
      el.parent = parent
    }
    if (isInstanceof(parent, VectorSource) && isInstanceof(el, Feature)) {
      parent.addFeature(el)
      // @ts-expect-error: internal usage
      el.__removeFn = () => parent.removeFeature(el)
      // @ts-expect-error: internal usage
      el.parent = parent
    }

    if (isInstanceof(parent, Feature) && isInstanceof(el, Geometry)) {
      parent.setGeometry(el)
      // @ts-expect-error: internal usage
      el.__removeFn = () => parent.setGeometry(undefined)
      // @ts-expect-error: internal usage
      el.parent = parent
    }
  },
  remove(el) {
    if (el && '__removeFn' in el)
      el.__removeFn()
  },
  patchProp(el, prop, prevValue, nextValue, _isSVG, prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (prop === 'args')
      return
    if (el && prevValue !== nextValue) {
      if (prop.match(/^on\S/)) {
        if (!el.hasListener(nextValue)) {
          const eventType = prop.replace(/^on(\S)(.+)$/, (_, $1, $2) => $1.toLowerCase() + $2)
          el.on(eventType as any, nextValue)
        }
      }
      else {
        const propSetter = `set${prop.replace(/^\S/, s => s.toUpperCase())}`
        if (Reflect.has(el, propSetter)) {
          el[propSetter](nextValue)
        }
        else if (Reflect.has(el, `${prop}_`)) {
          // patch prop by modify private property
          if (el[`${prop}_`] !== nextValue)
            el[`${prop}_`] = nextValue
        }
        else {
          console.warn(`[v-layers]: Cant't Patch Prop: ${prop}, this option maybe can\'t changed so might will re-created an instance`)
        }
      }
    }
  },
  parentNode(node) {
    return node?.parent || null
  },
  createText: () => null,
  createComment: () => null,
  setText: () => null,
  setElementText: () => null,

  nextSibling(node) {
    console.error('nextSibling() did\'t implemented yet')
  },

  querySelector: () => null,

  setScopeId: () => {},
  cloneNode(node) {
    if (node && 'clone' in node)
      return node.clone()
    return null
  },
  insertStaticContent() {
    console.error('insertStaticContent() did\'t implemented yet')
  },
}
