import type { DefineComponent } from '@vue/runtime-core'
import { type Options as CollectionOptions } from 'ol/Collection'
import { type Options as OverlayOptions } from 'ol/Overlay'
import type { AllInteractionComponents } from './types/interactions'
import type { AllLayerComponents } from './types/layers'
import type { AllSourceComponents } from './types/sources'
import type { AllGeomComponents } from './types/geoms'

export const VLayer = new Proxy({} as AllLayerComponents, {
  get(_target, p) {
    return `OlLayer.${p.toString()}`
  },
})

export const VSource = new Proxy({} as AllSourceComponents, {
  get(_target, p) {
    return `OlSource.${p.toString()}`
  },
})

export const VGeom = new Proxy({} as AllGeomComponents, {
  get(_, p) {
    return `OlGeom.${p.toString()}`
  },
})

export const VInteraction = new Proxy({} as AllInteractionComponents, {
  get(_, p) {
    return `OlInteraction.${p.toString()}`
  },
})

export const VOverlay = 'OlOverlay' as unknown as DefineComponent<OverlayOptions>

export const VFeature = 'OlFeature' as unknown as DefineComponent<{}>

export const VCollection = 'OlCollection' as unknown as DefineComponent<CollectionOptions>
