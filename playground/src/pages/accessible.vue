<script setup lang="ts">
import { VLayer, VMap, VSource } from '@v-layers/components'
import { View } from 'ol'

import 'ol/ol.css'

const view = new View({
  center: [0, 0],
  zoom: 2,
})
</script>

<template>
  <div style="height:300px;width:100%">
    <VMap :view="view">
      <VLayer.Tile>
        <VSource.OSM />
      </VLayer.Tile>
    </VMap>
  </div>
</template>
