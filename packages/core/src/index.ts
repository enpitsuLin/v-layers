import { type Slots, createRenderer } from '@vue/runtime-core'
import { option } from './option'
import { extend } from './catalogue'
import * as ol from 'ol'

export const { createApp } = createRenderer(option)

export const createVLayers = (slots: Slots) => {
  const app = createApp(internalFnComponent)
  function internalFnComponent() {
    return slots && slots.default ? slots.default() : []
  }
  return app
}

extend(ol)

export default { createVLayers, extend }
