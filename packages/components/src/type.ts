import type * as geom from 'ol/geom'
import type * as layers from 'ol/layer'
import type * as source from 'ol/source'
import type * as interaction from 'ol/interaction'
import type { DefineComponent } from '@vue/runtime-core'
import type { Observable } from 'ol'
import type { AviableProps, ObjectProps } from '@v-layers/core'

type ObservableEvents<T extends Observable> = {
  [Name in `on${Capitalize<Parameters<T['on']>[0][number]>}`]?: Function
}

type OmitEvent<T extends object> = Omit<T, Extract<keyof T, `on${string}`>>

export type AllLayerName = keyof typeof layers

export type LayerProps<Name extends AllLayerName> = ObjectProps<Name, typeof layers> & ObservableEvents<(typeof layers[Name])['prototype']>

export type AllLayer = {
  [Name in AllLayerName]: DefineComponent<NonNullable<LayerProps<Name>>>
}

export type AllSourceName = keyof Omit<typeof source, 'sourcesFromTileGrid'>

export type SourceProps<Name extends AllSourceName> = ObjectProps<Name, typeof source> & ObservableEvents<(typeof source[Name])['prototype']>

export type AllSource = { [Name in AllSourceName]: DefineComponent<NonNullable<SourceProps<Name>>> }

export type AllGeomName = keyof typeof geom

export type GeomProps<Name extends AllGeomName> = ConstructorParameters<typeof geom[Name]> & ObservableEvents<(typeof geom[Name])['prototype']>

export type AllGeom = { [Name in AllGeomName]: DefineComponent<AviableProps<{ args: GeomProps<Name>['length'] extends 0 ? never : GeomProps<Name> }>> }

export type AllInteractionName = keyof Omit<typeof interaction, 'defaults'>

export type InteractionProps<Name extends AllInteractionName> = OmitEvent<NonNullable<ConstructorParameters<typeof interaction[Name]>[0]>> & ObservableEvents<(typeof interaction[Name])['prototype']>

export type AllInteraction = { [Name in AllInteractionName]: DefineComponent<InteractionProps<Name>> }
