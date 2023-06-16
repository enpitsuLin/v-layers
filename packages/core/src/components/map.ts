import { View, Map as OlMap } from "ol";
import { createVLayers } from "../";
import { defineComponent, h, ref, watchPostEffect } from "vue";

export const Map = defineComponent({
  setup(_, { slots }) {

    const container = ref<HTMLElement>()

    watchPostEffect(() => {
      const map = new OlMap({
        target: container.value,
        view: new View({
          center: [0, 0],
          zoom: 4
        })
      })
      const app = createVLayers(slots)
      app.mount(map)
    })
    return () => h('div', { ref: container, style: "height:100%; width:100%", 'data-v-layers': '' })
  }
})
