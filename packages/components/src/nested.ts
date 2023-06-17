import type { DefineComponent } from 'vue'
import { type Options as CollectionOptions } from 'ol/Collection'
import type { AllGeom, AllLayer, AllSource } from '@v-layers/core'

export const Layer = new Proxy({} as AllLayer, {
  get(_target, p) {
    return `OlLayer.${p.toString()}`
  },
})

export const Source = new Proxy({} as AllSource, {
  get(_target, p) {
    return `OlSource.${p.toString()}`
  },
})

export const Geom = new Proxy({} as AllGeom, {
  get(_, p) {
    return `OlGeom.${p.toString()}`
  },
})

export const Feature = 'OlFeature' as unknown as DefineComponent<{}>

export const Collection = 'OlCollection' as unknown as DefineComponent<CollectionOptions>
