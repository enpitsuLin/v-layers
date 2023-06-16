import { RendererOptions } from '@vue/runtime-core'
import Map from 'ol/Map'
import BaseLayer from 'ol/layer/Base'
import Layer from 'ol/layer/Layer'
import Source from 'ol/source/Source'
import { catalogue } from './catalogue'
import type { BaseObjectConstructor, OlBaseObject } from './types'
import { isHTMLTag, isInstanceof } from './utils'

let map: Map | null = null

export const option: RendererOptions<OlBaseObject | null, OlBaseObject | null> = {
  createElement(type, _isSVG, _isCustomizedBuiltIn, props) {
    if (!props) props = {}

    console.log('createElement', { type, props });

    if (type === 'template') return null
    if (isHTMLTag(type)) return null
    let name = type.replace(/^Ol/, '')

    let instance

    const target = name.split('.').reduce((target, p) => (target as any)[p], catalogue.value) as unknown as BaseObjectConstructor
    if (!target) {
      // TODO(enpitsulin): error logger
      throw new Error(`${name} is undefined`)
    }
    instance = Reflect.construct(target, [props])
    return instance
  },
  insert(el, parent, anchor) {
    if (!el || !parent) return
    console.log('insert', { el, parent, anchor });
    if (isInstanceof(parent, Map) && !map) {
      map = parent as unknown as Map
    }
    if (isInstanceof(parent, Map) && isInstanceof(el, BaseLayer)) {
      parent.addLayer(el)
    }
    if (isInstanceof(parent, Layer) && isInstanceof(el, Source)) {
      parent.setSource(el)
    }


  },
  remove(el) {
    if (!el) return
  },
  patchProp(el, prop, prevValue, nextValue) {
    if (el) {
      console.log('patchProp', { el, prop, prevValue, nextValue });
      const getProperty = `get${prop.replace(/^\S/, s => s.toUpperCase())}`
      const property = `set${prop.replace(/^\S/, s => s.toUpperCase())}`
      if (getProperty in el) {
        if (el[getProperty]() === nextValue && property in el) {
          el[property](nextValue)
        }
      } else if (property in el) {
        el[property](nextValue)
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
  nextSibling() {
    throw new Error('didn\'t implemented')
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
