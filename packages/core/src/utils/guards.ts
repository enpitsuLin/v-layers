import type BaseObject from 'ol/Object'
import type { BaseObjectConstructor, InferInstanceType } from '../types'

export function isInstanceof<T extends BaseObjectConstructor>(target: BaseObject, expect: T): target is InferInstanceType<T> {
  return target instanceof expect
}
