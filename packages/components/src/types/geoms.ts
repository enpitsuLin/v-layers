import type * as geometries from 'ol/geom'
import type { DefineComponent } from '@vue/runtime-core'
import type { BaseObservableEvents, EventProps } from './events'

export type Geometries = { [Name in keyof typeof geometries]: typeof geometries[Name] }

export type GeometriesName = keyof Geometries

export type GeometriesEventMapping = {
  [Name in GeometriesName]: BaseObservableEvents
}

export type GeometriesProps<Name extends GeometriesName> = EventProps<NonNullable<ConstructorParameters<Geometries[Name]>[0]>, GeometriesEventMapping[Name]>

export type AllGeomComponents = { [Name in GeometriesName]: DefineComponent<GeometriesProps<Name>> }
