import type * as source from 'ol/source'
import type { DefineComponent } from '@vue/runtime-core'
import type { BaseObservableEvents, EventProps } from './events'

export type Sources = Omit<typeof source, 'sourcesFromTileGrid'>

export type SourcesName = keyof Sources

export type SourceEventMapping = {
  [Name in SourcesName]: BaseObservableEvents
}

export type SourcesProps<Name extends SourcesName> = EventProps<NonNullable<ConstructorParameters<Sources[Name]>[0]>, SourceEventMapping[Name]>

export type AllSourceComponents = { [Name in SourcesName]: DefineComponent<SourcesProps<Name>> }
