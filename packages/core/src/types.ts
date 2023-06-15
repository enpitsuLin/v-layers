import type BaseObject from "ol/Object"

export type BaseObjectConstructor = new (...args: any[]) => BaseObject

export type InferInstanceType<T extends BaseObjectConstructor> = T extends new (...args: any[]) => infer Instance ? Instance : never

export type OlCatalogue = Record<string, BaseObjectConstructor>

export type OlBaseObject = BaseObject & { [props: string]: any }
