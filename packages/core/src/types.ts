import type BaseObject from "ol/Object"
import type * as layers from 'ol/layer'
import type * as source from 'ol/source'
import { DefineComponent } from "vue"

/// type utils

export type BaseObjectConstructor = new (...args: any[]) => BaseObject

export type InferInstanceType<T extends BaseObjectConstructor> = T extends new (...args: any[]) => infer Instance ? Instance : never

export type OlCatalogue = {
  [name: string]: { [name: string]: BaseObjectConstructor } | BaseObjectConstructor
}
export type OlBaseObject = BaseObject & { [props: string]: any }

export type NestedPath<ObjectType extends object> =
  {
    [Key in keyof ObjectType & (string | number)]:
    ObjectType[Key] extends object
    ? Key | `${Key}.${NestedPath<ObjectType[Key]>}`
    : `${Key}`
  }[keyof ObjectType & (string | number)];

// component props type

export type AllLayerName = keyof typeof layers

export type LayerProps<Name extends AllLayerName> = ConstructorParameters<typeof layers[Name]>[0]

export type AllLayer = { [Name in AllLayerName]: DefineComponent<NonNullable<LayerProps<Name>> & { passRef?: (el: InstanceType<typeof layers[Name]>) => void }> }


export type AllSourceName = keyof Omit<typeof source, 'sourcesFromTileGrid'>

export type SourceProps<Name extends AllSourceName> = ConstructorParameters<typeof source[Name]>[0]

export type AllSource = { [Name in AllSourceName]: DefineComponent<NonNullable<SourceProps<Name>> & { passRef?: (el: InstanceType<typeof source[Name]>) => void }> }




