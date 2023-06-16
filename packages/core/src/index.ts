import { createRenderer, type Slots } from '@vue/runtime-core'
import { extend } from './catalogue'
import { option } from './option'
import * as Layer from 'ol/layer'
import * as Source from 'ol/source'
import * as Geom from 'ol/geom'
import { Collection } from 'ol'

export const { createApp, render } = createRenderer(option)

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
  Geom,
  Collection
})

export default { createVLayers, extend }
export * from '@vue/runtime-core'
export * from './components'
