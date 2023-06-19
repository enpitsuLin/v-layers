import { type Slots, createRenderer } from '@vue/runtime-core'
import * as Layer from 'ol/layer'
import * as Source from 'ol/source'
import * as Geom from 'ol/geom'
import * as Control from 'ol/control'
import * as Interaction from 'ol/interaction'
import { Collection, Feature, Overlay } from 'ol'
import { option } from './option'
import { extend } from './catalogue'
import { objectOmit } from './utils'

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
  Control: objectOmit(Control, 'defaults'),
  Interaction: objectOmit(Interaction, 'defaults'),
  Collection,
  Feature,
  Overlay,
})

export * from '@vue/runtime-core'
export * from './types'
