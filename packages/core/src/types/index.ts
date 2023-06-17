import type BaseObject from 'ol/Object'
import type { BaseObjectConstructor } from './utils'

export interface OlCatalogue {
  [name: string]: { [name: string]: BaseObjectConstructor } | BaseObjectConstructor
}

export type OlBaseObject = BaseObject & { [props: string]: any }

export * from './utils'
export * from './components'
