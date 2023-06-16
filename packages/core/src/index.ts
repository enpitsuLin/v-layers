import { createRenderer, type Slots } from '@vue/runtime-core'
import { extend } from './catalogue'
import { option } from './option'
import * as Layer from 'ol/layer'
import * as Source from 'ol/source'
import * as Geom from 'ol/geom'

export const { createApp } = createRenderer(option)

export const createVLayers = (slots: Slots) => {
  const app = createApp(internalFnComponent)
  function internalFnComponent() {
    return slots && slots.default ? slots.default() : []
  }
  return app
}

extend({
  Layer,
  Source,
  Geom
})

export default { createVLayers, extend }
