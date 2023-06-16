<script setup lang="ts">
import { Layer, Source } from '@v-layers/core';
import GeoJSON from 'ol/format/GeoJSON.js';
import { ref, watchPostEffect } from 'vue';
import Map from './Map.vue';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const mapRef = ref<InstanceType<typeof Map>>()

const VectorLayerRef = ref<VectorLayer<VectorSource>>()

watchPostEffect(() => {
  console.log(VectorLayerRef.value);
})
</script>

<template>
  <div style="height:300px;width:400px">
    <Map ref="mapRef">
      <Layer.Vector ref="VectorLayerRef" background="#1a2b39" :updateWhileAnimating="true">
        <Source.Vector url="https://openlayers.org/data/vector/ecoregions.json" :format="new GeoJSON()"></Source.Vector>
      </Layer.Vector>
    </Map>
  </div>
</template>

 