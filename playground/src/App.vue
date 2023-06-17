<script setup lang="ts">
import { Layer, Map, Source } from '@v-layers/core';
import { View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { ref } from 'vue';

const mapRef = ref<InstanceType<typeof Map>>()

const VectorLayerRef = ref<VectorLayer<VectorSource>>()

const defaultView = new View({ center: [0, 0], zoom: 4 })
</script>

<template>
  <div style="height:300px;width:400px">
    <Map ref="mapRef" :view="defaultView">
      <Layer.Vector ref="VectorLayerRef" background="#1a2b39" :updateWhileAnimating="true">
        <Source.Vector url="https://openlayers.org/data/vector/ecoregions.json" :format="new GeoJSON()"></Source.Vector>
      </Layer.Vector>
    </Map>
  </div>
</template>

 