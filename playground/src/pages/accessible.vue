<script setup lang="ts">
import { Layer, Map, Source } from '@v-layers/components'
import { View } from 'ol'

import 'ol/ol.css'

const view = new View({
  center: [0, 0],
  zoom: 2,
})
</script>

<template>
  <div style="height:300px;width:100%">
    <Map :view="view">
      <Layer.Tile>
        <Source.OSM />
      </Layer.Tile>
    </Map>
  </div>
</template>
