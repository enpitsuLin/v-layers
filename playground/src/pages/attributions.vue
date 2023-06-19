<script setup lang=ts>
import 'ol/ol.css'

import View from 'ol/View.js'
import { Attribution, defaults as defaultControls } from 'ol/control.js'
import { VLayer, VMap, VSource } from '@v-layers/components'
import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

const collapsible = new Attribution({ collapsible: false })

const map = ref<InstanceType<typeof VMap>>()

useResizeObserver(document.documentElement, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect

  collapsible.setCollapsible(width < 600)
  collapsible.setCollapsed(width < 600)
})

const view = new View({
  center: [0, 0],
  zoom: 2,
})

function onClick() {
}
</script>

<template>
  <div style="height: 400px;width: 100%;">
    <VMap ref="map" :view="view" :controls="defaultControls({ attribution: false }).extend([collapsible])">
      <VLayer.Tile>
        <VSource.OSM />
      </VLayer.Tile>
    </VMap>
    <button @click="onClick">
      click
    </button>
  </div>
</template>
