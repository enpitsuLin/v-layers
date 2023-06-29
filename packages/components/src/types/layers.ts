import type * as layers from 'ol/layer'
import type { DefineComponent } from '@vue/runtime-core'
import type { BaseObservableEvents, EventProps } from './events'

export type Layers = { [Name in keyof typeof layers]: typeof layers[Name] }

export type LayersName = keyof Layers

export type LayersEventMapping = {
  [Name in LayersName]: BaseObservableEvents
}

export type LayersProps<Name extends LayersName> = EventProps<NonNullable<ConstructorParameters<Layers[Name]>[0]>, LayersEventMapping[Name]>

export type AllLayerComponents = { [Name in LayersName]: DefineComponent<LayersProps<Name>> }
