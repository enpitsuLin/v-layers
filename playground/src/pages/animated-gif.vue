<script setup lang="ts">
import 'ol/ol.css'

import { VFeature, VGeom, VLayer, VMap, VSource } from '@v-layers/components'
import { type Feature as OlFeature, View } from 'ol'
import { useScriptTag } from '@vueuse/core'
import { ref, unref } from 'vue'
import type { Point } from 'ol/geom'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'

const view = new View({
  center: [0, 0],
  zoom: 2,
})

const map = ref<InstanceType<typeof VMap>>()
const feature = ref<OlFeature<Point>>()

declare const gifler: any

useScriptTag('https://cdn.jsdelivr.net/npm/gifler@0.1.0/gifler.min.js', () => {
  const gif = gifler('https://openlayers.org/en/latest/examples/data/globe.gif')

  gif.frames(
    document.createElement('canvas'),
    (ctx: any, frame: any) => {
      const iconFeature = unref(feature)
      if (!iconFeature?.getStyle()) {
        iconFeature?.setStyle(
          new Style({
            image: new Icon({
              img: ctx.canvas,
              imgSize: [frame.width, frame.height],
              opacity: 0.8,
            }),
          }),
        )
      }
      ctx.clearRect(0, 0, frame.width, frame.height)
      ctx.drawImage(frame.buffer, frame.x, frame.y)
      map.value?.map.render()
    },
  )
})
</script>

<template>
  <div style="height:300px;width:100%">
    <VMap ref="map" :view="view">
      <VLayer.Tile>
        <VSource.Stamen layer="toner" />
      </VLayer.Tile>
      <VLayer.Vector>
        <VSource.Vector>
          <VFeature ref="feature">
            <VGeom.Point :args="[[0, 0]]" />
          </VFeature>
        </VSource.Vector>
      </VLayer.Vector>
    </VMap>
  </div>
</template>
