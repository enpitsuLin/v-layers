<script setup lang="ts">
import 'ol/ol.css'

import { Layer, Map, Source } from '@v-layers/components'
import GeoJSON from 'ol/format/GeoJSON'
import { View } from 'ol'
import { ref } from 'vue'
import type VectorSource from 'ol/source/Vector'
import type { Point, Polygon } from 'ol/geom'

const view = new View({
  center: [0, 0],
  zoom: 2,
})

const source = ref<VectorSource<Polygon | Point>>()
const mapRef = ref<InstanceType<typeof Map>>()

function zoomToSwitzerland() {
  if (!source.value)
    return
  const feature = source.value?.getFeatures()[0]
  const polygon = feature.getGeometry()! as Polygon
  view.fit(polygon, { padding: [170, 50, 30, 150] })
}

function zoomToLausanne() {
  if (!source.value)
    return
  const feature = source.value.getFeatures()[1]
  const point = feature.getGeometry()! as Point
  view.fit(point, { padding: [170, 50, 30, 150], minResolution: 50 })
}

function centerLausanne() {
  if (!source.value)
    return
  const feature = source.value.getFeatures()[1]
  const point = feature.getGeometry()! as Point
  const size = mapRef.value!.map.getSize()!
  view.centerOn(point.getCoordinates(), size, [570, 500])
}
</script>

<template>
  <div class="mapcontainer">
    <div id="map" class="map">
      <Map ref="mapRef" :view="view">
        <Layer.Tile>
          <Source.OSM />
        </Layer.Tile>
        <Layer.Vector
          :style="{
            'fill-color': 'rgba(255, 255, 255, 0.6)',
            'stroke-width': 1,
            'stroke-color': '#319FD3',
            'circle-radius': 5,
            'circle-fill-color': 'rgba(255, 255, 255, 0.6)',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#319FD3',
          }"
        >
          <Source.Vector
            ref="source" url="https://openlayers.org/en/latest/examples/data/geojson/switzerland.geojson"
            :format="new GeoJSON()"
          />
        </Layer.Vector>
      </Map>
    </div>
    <div class="padding-top" />
    <div class="padding-left" />
    <div class="padding-right" />
    <div class="padding-bottom" />
    <div class="center" />
  </div>
  <button @click="zoomToSwitzerland">
    Zoom to Switzerland
  </button> (best fit).<br>
  <button @click="zoomToLausanne">
    Zoom to Lausanne
  </button> (with min resolution),<br>
  <button @click="centerLausanne">
    Center on Lausanne
  </button>
</template>

<style>
.map {
  width: 100%;
  height: 400px;
}

.mapcontainer {
  position: relative;
  margin-bottom: 20px;
}

.map {
  width: 1000px;
  height: 600px;
}

.map .ol-zoom {
  top: 178px;
  left: 158px;
}

.map .ol-rotate {
  top: 178px;
  right: 58px;
}

.map .ol-attribution,
.map .ol-attribution.ol-uncollapsible {
  bottom: 30px;
  right: 50px;
}

.padding-top {
  position: absolute;
  top: 0;
  left: 0px;
  width: 1000px;
  height: 170px;
  background: rgba(255, 255, 255, 0.5);
}

.padding-left {
  position: absolute;
  top: 170px;
  left: 0;
  width: 150px;
  height: 400px;
  background: rgba(255, 255, 255, 0.5);
}

.padding-right {
  position: absolute;
  top: 170px;
  left: 950px;
  width: 50px;
  height: 400px;
  background: rgba(255, 255, 255, 0.5);
}

.padding-bottom {
  position: absolute;
  top: 570px;
  left: 0px;
  width: 1000px;
  height: 30px;
  background: rgba(255, 255, 255, 0.5);
}

.center {
  position: absolute;
  border: solid 1px black;
  top: 490px;
  left: 560px;
  width: 20px;
  height: 20px;
}
</style>
