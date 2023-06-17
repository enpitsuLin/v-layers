import type * as geom from 'ol/geom'
import type * as layers from 'ol/layer'
import type * as source from 'ol/source'
import { DefineComponent } from "vue"
import type { ObjectProps, AviableProps } from './utils'

export type AllLayerName = keyof typeof layers

export type LayerProps<Name extends AllLayerName> = ObjectProps<Name, typeof layers>

export type AllLayer = { [Name in AllLayerName]: DefineComponent<NonNullable<LayerProps<Name>>> }


export type AllSourceName = keyof Omit<typeof source, 'sourcesFromTileGrid'>

export type SourceProps<Name extends AllSourceName> = ObjectProps<Name, typeof source>

export type AllSource = { [Name in AllSourceName]: DefineComponent<NonNullable<SourceProps<Name>>> }

export type AllGeomName = keyof typeof geom

export type GeomProps<Name extends AllGeomName> = ConstructorParameters<typeof geom[Name]>

export type AllGeom = { [Name in AllGeomName]: DefineComponent<AviableProps<{ args: GeomProps<Name>['length'] extends 0 ? never : GeomProps<Name> }>> }

