import type BaseObject from 'ol/Object'

export type BaseObjectConstructor = new (...args: any[]) => BaseObject

export type InferInstanceType<T extends BaseObjectConstructor> = T extends new (...args: any[]) => infer Instance ? Instance : never

export type ObjectProps<Name extends string, Source extends Record<Name, any>> = ConstructorParameters<Source[Name]>[0]

export type AviableProps<T> = { [P in keyof T as T[P] extends never ? never : P]: T[P] }
