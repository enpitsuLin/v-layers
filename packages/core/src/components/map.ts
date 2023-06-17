import { Map as OlMap } from 'ol'
import { defineComponent, h, ref, shallowRef, watch, watchPostEffect } from 'vue'
import { createVLayers } from '../'

type MapChildOptions = 'target' | 'layers' | 'controls' | 'interactions' | 'overlays'

type MapProps = Omit<NonNullable<ConstructorParameters<typeof OlMap>[0]>, MapChildOptions>

export const Map = defineComponent<MapProps, { map: OlMap }>({
  props: ['keyboardEventTarget', 'maxTilesLoading', 'moveTolerance', 'pixelRatio', 'view'] as unknown as undefined,
  setup(props, { slots, expose }) {
    const container = ref<HTMLElement>()
    const map = shallowRef<OlMap>(new OlMap(props))
    expose({ map })

    watchPostEffect((onCleanup) => {
      if (!container.value)
        return
      map.value.setTarget(container.value)
      const app = createVLayers(slots)
      app.mount(map.value)

      onCleanup(() => {
        app.unmount()
        map.value && map.value.dispose()
      })
    })

    watch(
      () => props, (val, oldVal) => {
        if (Object.is(val, oldVal)) {
          val.view && map.value.setView(val.view)

          // @ts-expect-error: internal properties
          val.maxTilesLoading ? map.value.maxTilesLoading_ = val.maxTilesLoading : void 0
          // @ts-expect-error: internal properties
          val.keyboardEventTarget ? map.value.keyboardEventTarget_ = val.keyboardEventTarget : void 0
          // @ts-expect-error: internal properties
          val.moveTolerance ? map.value.moveTolerance_ = val.moveTolerance : void 0
          // @ts-expect-error: internal properties
          val.pixelRatio ? map.value.pixelRatio_ = pixelRatio : void 0
        }
      },
      { deep: true },
    )

    return () => h('div', { 'ref': container, 'style': 'height:100%; width:100%', 'data-v-layers': '' })
  },
})
