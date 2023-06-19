import type { DefineComponent } from '@vue/runtime-core'
import { type Options as CollectionOptions } from 'ol/Collection'
import type { AllGeom, AllLayer, AllSource } from './type'

export const VLayer = new Proxy({} as AllLayer, {
  get(_target, p) {
    return `OlLayer.${p.toString()}`
  },
})

export const VSource = new Proxy({} as AllSource, {
  get(_target, p) {
    return `OlSource.${p.toString()}`
  },
})

export const VGeom = new Proxy({} as AllGeom, {
  get(_, p) {
    return `OlGeom.${p.toString()}`
  },
})

export const VFeature = 'OlFeature' as unknown as DefineComponent<{}>

export const VCollection = 'OlCollection' as unknown as DefineComponent<CollectionOptions>
