import { RendererOptions } from '@vue/runtime-core'
import Map from 'ol/Map'
import { catalogue } from './catalogue'
import type { OlBaseObject } from './types'
import { isHTMLTag, isInstanceof } from './utils'

let map: Map | null = null

export const option: RendererOptions<OlBaseObject | null, OlBaseObject | null> = {
  createElement(type, _isSVG, _isCustomizedBuiltIn, props) {
    if (!props) props = {}

    if (!props.args) {
      props.args = []
    }
    if (type === 'template') return null
    if (isHTMLTag(type)) return null
    let name = type.replace(/^Ol/, '')

    let instance

    const target = catalogue.value[name]
    if (!target) {
      // TODO(enpitsulin): error logger
      throw new Error(`${name} is undefined`)
    }
    instance = Reflect.construct(target, props.args)
    return instance
  },
  insert(el, parent, anchor) {
    if (parent && isInstanceof(parent, Map)) map = parent as unknown as Map
  },
  remove(el) {
    if (!el) return
  },
  patchProp() {
    throw new Error('didn\'t implemented')
  },

  parentNode(node) {
    return node?.parent || null
  },
  createText() {
    throw new Error('didn\'t implemented')
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
