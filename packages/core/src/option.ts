import { RendererOptions } from '@vue/runtime-core'
import Map from 'ol/Map'
import BaseLayer from 'ol/layer/Base'
import Layer from 'ol/layer/Layer'
import Source from 'ol/source/Source'
import { catalogue } from './catalogue'
import type { BaseObjectConstructor, OlBaseObject } from './types'
import { isHTMLTag, isInstanceof } from './utils'
import { Collection, Feature } from 'ol'
import VectorSource from 'ol/source/Vector'
import { Geometry } from 'ol/geom'

let map: Map | null = null

export const option: RendererOptions<OlBaseObject | null, OlBaseObject | null> = {
  createElement(type, _isSVG, _isCustomizedBuiltIn, props) {
    if (!props) props = {}
    let args = [props]
    if (props.args) {
      args = Array.from(props.args)
    }

    if (type === 'template') return null
    if (isHTMLTag(type)) return null
    let name = type.replace(/^Ol/, '')

    let instance

    const target = name.split('.').reduce((target, p) => (target as any)[p], catalogue.value) as unknown as BaseObjectConstructor
    if (!target) {
      // TODO(enpitsulin): error logger
      throw new Error(`${name} is undefined`)
    }

    instance = Reflect.construct(target, args)
    return instance
  },
  insert(el, parent, anchor) {
    if (!el || !parent) return
    if (isInstanceof(parent, Map) && !map) {
      map = parent as unknown as Map
    }
    if (isInstanceof(parent, Map) && isInstanceof(el, BaseLayer)) {
      parent.addLayer(el)
    }
    if (isInstanceof(parent, Layer) && isInstanceof(el, Source)) {
      parent.setSource(el)
    }
    if (isInstanceof(parent, Collection)) {
      parent.push(el)
    }
    if (isInstanceof(parent, VectorSource) && isInstanceof(el, Feature)) {
      parent.addFeature(el)
    }
    if (isInstanceof(parent, Feature) && isInstanceof(el, Geometry)) {
      parent.setGeometry(el)
    }
  },
  remove(el) {
    if (!el) return
  },
  patchProp(el, prop, prevValue, nextValue) {
    if (prop === 'args') return
    if (el && prevValue !== nextValue) {
      const propSetter = `set${prop.replace(/^\S/, s => s.toUpperCase())}`

      if (Reflect.has(el, propSetter)) {
        el[propSetter](nextValue)
      } else if (Reflect.has(el, `${prop}_`)) {
        console.log(prop + ' is private:', { private: el[`${prop}_`], el, nextValue });
        if (el[`${prop}_`] !== nextValue) {
          el[`${prop}_`] = nextValue
        }
      } else {
        console.error('cant\'t patch prop' + prop)
      }
    }
  },

  parentNode(node) {
    return node?.parent || null
  },
  createText() {
    return null
  },
  createComment() {
    throw new Error('didn\'t implemented')
  },

  setText() {
    throw new Error('didn\'t implemented')
  },

  setElementText() {
    throw new Error('didn\'t implemented')
  },
  nextSibling(node) {
    console.log(node);
    return node
    // throw new Error('didn\'t implemented')
  },

  querySelector() {
    throw new Error('didn\'t implemented')
  },

  setScopeId() {
    throw new Error('didn\'t implemented')
  },
  cloneNode() {
    throw new Error('didn\'t implemented')
  },

  insertStaticContent() {
    throw new Error('didn\'t implemented')
  },
}
