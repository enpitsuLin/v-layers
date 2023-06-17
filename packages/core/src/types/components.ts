import type * as geom from 'ol/geom'
import type * as layers from 'ol/layer'
import type * as source from 'ol/source'
import type { DefineComponent } from 'vue'
import type Layer from 'ol/layer/Base'
import type { AviableProps, ObjectProps } from './utils'

export type AllLayerName = keyof typeof layers

export type LayerProps<Name extends AllLayerName> = ObjectProps<Name, typeof layers> & LayerEvent<(typeof layers[Name])['prototype']>

type LayerEvent<T extends Layer> = { [Name in `on${Capitalize<Parameters<T['on']>[0][number]>}`]?: Function }

export type AllLayer = {
  [Name in AllLayerName]: DefineComponent<NonNullable<LayerProps<Name>>>
}

export type AllSourceName = keyof Omit<typeof source, 'sourcesFromTileGrid'>

export type SourceProps<Name extends AllSourceName> = ObjectProps<Name, typeof source>

export type AllSource = { [Name in AllSourceName]: DefineComponent<NonNullable<SourceProps<Name>>> }

export type AllGeomName = keyof typeof geom

export type GeomProps<Name extends AllGeomName> = ConstructorParameters<typeof geom[Name]>

export type AllGeom = { [Name in AllGeomName]: DefineComponent<AviableProps<{ args: GeomProps<Name>['length'] extends 0 ? never : GeomProps<Name> }>> }
