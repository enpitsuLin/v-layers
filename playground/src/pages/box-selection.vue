<script setup lang="ts">
import 'ol/ol.css'

import GeoJSON from 'ol/format/GeoJSON.js'
import { VInteraction, VLayer, VMap, VSource } from '@v-layers/components'
import type { Feature } from 'ol'
import { Collection, View } from 'ol'
import { Fill, Stroke, Style } from 'ol/style'
import type { FeatureLike } from 'ol/Feature'

import { platformModifierKeyOnly } from 'ol/events/condition.js'
import type DragBox from 'ol/interaction/DragBox'
import { ref, shallowRef, watchPostEffect } from 'vue'
import { getWidth } from 'ol/extent'
import type VectorSource from 'ol/source/Vector'
import type Select from 'ol/interaction/Select'
import type { Geometry } from 'ol/geom'

const map = shallowRef<InstanceType<typeof VMap>>()
const vectorSource = shallowRef<VectorSource>()
const dragBox = shallowRef<DragBox>()
const select = shallowRef<Select>()
const selectedFeatures = shallowRef<Collection<Feature<Geometry>>>(new Collection())

const infoBox = ref('None')

const style = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
})

const selectedStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 0.7)',
    width: 2,
  }),
})

const view = new View({
  center: [0, 0],
  zoom: 2,
  constrainRotation: 16,
})

function getStyle(feature: FeatureLike) {
  const color = feature.get('COLOR_BIO') || '#eeeeee'
  style.getFill().setColor(color)
  return style
}

function getSelectStyle(feature: FeatureLike) {
  const color = feature.get('COLOR_BIO') || '#eeeeee'
  selectedStyle.getFill().setColor(color)
  return selectedStyle
}

function onBoxstart() {
  selectedFeatures.value.clear()
}

function onBoxend() {
  if (!dragBox.value || !vectorSource.value || !map.value)
    return
  const boxExtent = dragBox.value!.getGeometry().getExtent()!

  // if the extent crosses the antimeridian process each world separately
  const worldExtent = map.value.map.getView().getProjection().getExtent()
  const worldWidth = getWidth(worldExtent)
  const startWorld = Math.floor((boxExtent[0] - worldExtent[0]) / worldWidth)
  const endWorld = Math.floor((boxExtent[2] - worldExtent[0]) / worldWidth)

  for (let world = startWorld; world <= endWorld; ++world) {
    const left = Math.max(boxExtent[0] - world * worldWidth, worldExtent[0])
    const right = Math.min(boxExtent[2] - world * worldWidth, worldExtent[2])
    const extent = [left, boxExtent[1], right, boxExtent[3]]

    const boxFeatures = vectorSource.value
      .getFeaturesInExtent(extent)
      .filter(
        feature =>
          !selectedFeatures.value.getArray().includes(feature)
          && feature.getGeometry()!.intersectsExtent(extent),
      )

    // features that intersect the box geometry are added to the
    // collection of selected features

    // if the view is not obliquely rotated the box geometry and
    // its extent are equalivalent so intersecting features can
    // be added directly to the collection
    const rotation = map.value.map.getView().getRotation()
    const oblique = rotation % (Math.PI / 2) !== 0

    // when the view is obliquely rotated the box extent will
    // exceed its geometry so both the box and the candidate
    // feature geometries are rotated around a common anchor
    // to confirm that, with the box geometry aligned with its
    // extent, the geometries intersect
    if (oblique) {
      const anchor = [0, 0]
      const geometry = dragBox.value.getGeometry().clone()
      geometry.translate(-world * worldWidth, 0)
      geometry.rotate(-rotation, anchor)
      const extent = geometry.getExtent()
      boxFeatures.forEach((feature) => {
        const geometry = feature.getGeometry()!.clone()
        geometry.rotate(-rotation, anchor)
        if (geometry.intersectsExtent(extent))
          selectedFeatures.value.push(feature)
      })
    }
    else {
      selectedFeatures.value.extend(boxFeatures)
    }
  }
}

watchPostEffect(() => {
  if (select.value?.getFeatures())
    selectedFeatures.value = select.value?.getFeatures()
})

function onSelectedFeaturesChange() {
  const names = selectedFeatures.value.getArray().map((feature) => {
    return feature.get('ECO_NAME')
  })
  if (names.length > 0)
    infoBox.value = names.join(', ')

  else
    infoBox.value = 'None'
}

watchPostEffect(() => {
  selectedFeatures.value.on(['add', 'remove'], onSelectedFeaturesChange)
})
</script>

<template>
  <div style="height:400px;width:100%">
    <VMap ref="map" :view="view">
      <VLayer.Vector background="#1a2b39" :style="getStyle">
        <VSource.Vector
          ref="vectorSource"
          url="https://openlayers.org/data/vector/ecoregions.json"
          :format="new GeoJSON()"
        />
      </VLayer.Vector>

      <VInteraction.Select
        ref="select"
        :style="getSelectStyle"
      />
      <VInteraction.DragBox
        ref="dragBox"
        :condition="platformModifierKeyOnly"
        @boxend="onBoxend"
        @boxstart="onBoxstart"
      />
    </VMap>
  </div>
  <div>Selected regions: <span>{{ infoBox }}</span></div>
</template>
