/// TODO(enpitsulin): exact to another package

import { SlotsType, defineComponent, h } from "vue";
import { AllLayer, AllSource } from "./types";
import { type Options } from 'ol/Collection'

const layerGetter = (p: string | symbol) => {
  return defineComponent({
    inheritAttrs: true,
    slots: {} as SlotsType<{
      default(): any;
      source(): any
    }>,
    setup(_, { attrs, slots }) {
      return () => h(`OlLayer.${p.toString()}`, attrs, slots.default?.())
    }
  })
}

export const Layer = new Proxy({} as AllLayer, {
  get(_target, p) {
    return layerGetter(p)
  },
})

const sourceGetter = (p: string | symbol) => {
  return defineComponent({
    inheritAttrs: true,
    setup(_, { attrs, slots }) {
      return () => h(`OlSource.${p.toString()}`, attrs, slots.default?.())
    }
  })
}

export const Source = new Proxy({} as AllSource, {
  get(_target, p) {
    return sourceGetter(p)
  },
})

export const Collection = defineComponent<Options>({
  inheritAttrs: true,
  setup(_, attr) {
    return () => h('OlCollection', attr)
  }
})
