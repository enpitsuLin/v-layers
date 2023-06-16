<script setup lang="ts">
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from './Map.vue'
</script>

<template>
  <div style="height:300px;width:400px">
    <Map>
      <OlLayer.Vector background="#1a2b39">
        <OlSource.Vector url="https://openlayers.org/data/vector/ecoregions.json" :format="new GeoJSON()" />
      </OlLayer.Vector>
    </Map>
  </div>
</template>

 