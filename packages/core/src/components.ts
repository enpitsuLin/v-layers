/// TODO(enpitsulin): exact to another package

import { DefineComponent, resolveComponent } from "@vue/runtime-core";
import { type Options as CollectionOption } from 'ol/Collection';
import { AllLayer, AllSource } from "./types";

export const Layer = new Proxy({} as AllLayer, {
  get(_target, p) {
    return resolveComponent(`OlLayer.${p.toString()}`)
  },
})

export const Source = new Proxy({} as AllSource, {
  get(_target, p) {
    return resolveComponent(`OlSource.${p.toString()}`)
  },
})

export const Collection = resolveComponent('OlCollection') as DefineComponent<CollectionOption>
