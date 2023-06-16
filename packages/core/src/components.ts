/// TODO(enpitsulin): exact to another package

import { SlotsType, defineComponent, h, ref, watchPostEffect } from "@vue/runtime-core";
import { type Options } from 'ol/Collection';
import { AllLayer, AllSource } from "./types";

const layerGetter = (p: string | symbol) => {
  return defineComponent({
    inheritAttrs: true,
    props: ['passRef'],
    slots: {} as SlotsType<{
      default(): any;
      source(): any
    }>,
    setup(props, { attrs, slots }) {
      const instance = ref()
      watchPostEffect(() => {
        if (!instance.value) return
        props.passRef?.(instance.value, {})
      })
      return () => h(
        `OlLayer.${p.toString()}`,
        {
          ...attrs,
          ref: instance
        },
        slots.default?.()
      )
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
