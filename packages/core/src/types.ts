import type BaseObject from "ol/Object"

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

