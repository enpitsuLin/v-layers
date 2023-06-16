<script setup lang="ts">
import { Layer, Source } from '@v-layers/core';
import GeoJSON from 'ol/format/GeoJSON.js';
import { ref } from 'vue';
import Map from './Map.vue';

const mapRef = ref<InstanceType<typeof Map>>()
</script>

<template>
  <div style="height:300px;width:400px">
    <Map ref="mapRef">
      <Layer.Vector background="#1a2b39" :updateWhileAnimating="true">
        <Source.Vector url="https://openlayers.org/data/vector/ecoregions.json" :format="new GeoJSON()"></Source.Vector>
      </Layer.Vector>
    </Map>
  </div>
</template>

 