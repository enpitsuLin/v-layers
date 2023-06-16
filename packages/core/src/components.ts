/// TODO(enpitsulin): extract to another package

import { DefineComponent } from "@vue/runtime-core";
import { type Options as CollectionOption } from 'ol/Collection';
import { AllLayer, AllSource } from "./types";

export const Layer = new Proxy({} as AllLayer, {
  get(_target, p) {
    return `OlLayer.${p.toString()}`
  },
})

export const Source = new Proxy({} as AllSource, {
  get(_target, p) {
    return `OlSource.${p.toString()}`
  },
})

export const Collection = 'OlCollection' as unknown as DefineComponent<CollectionOption>
