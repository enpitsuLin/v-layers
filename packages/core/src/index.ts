import { type Slots, createRenderer } from '@vue/runtime-core'
import * as Layer from 'ol/layer'
import * as Source from 'ol/source'
import * as Geom from 'ol/geom'
import { Collection, Feature } from 'ol'
import { option } from './option'
import { extend } from './catalogue'

export const { createApp, render } = createRenderer(option)

export function createVLayers(slots: Slots) {
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
  Collection,
  Feature,
})

export default { createVLayers, extend }
export * from '@vue/runtime-core'
export * from './components'
