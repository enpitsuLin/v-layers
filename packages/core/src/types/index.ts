import BaseObject from 'ol/Object'
import { BaseObjectConstructor } from './utils'

export type OlCatalogue = {
  [name: string]: { [name: string]: BaseObjectConstructor } | BaseObjectConstructor
}

export type OlBaseObject = BaseObject & { [props: string]: any }

export * from './utils'
export * from './components'
