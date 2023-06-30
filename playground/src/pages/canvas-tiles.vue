<script setup lang="ts">
import 'ol/ol.css'

import { VLayer, VMap, VSource } from '@v-layers/components'
import { View } from 'ol'

const view = new View({
  center: [0, 0],
  zoom: 1,
})
</script>

<template>
  <VMap :view="view" style="height:400px;width:100%">
    <VLayer.Tile>
      <VSource.OSM />
    </VLayer.Tile>
    <VLayer.Tile>
      <VSource.TileDebug />
    </VLayer.Tile>
  </VMap>
</template>
