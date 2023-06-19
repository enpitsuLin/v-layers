<script setup lang="ts">
import 'ol/ol.css'

import { VLayer, VMap, VSource } from '@v-layers/components'
import { View } from 'ol'
import { createXYZ } from 'ol/tilegrid'
import { fromLonLat } from 'ol/proj'
import { tile as tileStrategy } from 'ol/loadingstrategy'
import { Fill, Stroke, Style } from 'ol/style'
import EsriJSON from 'ol/format/EsriJSON'
import type { FeatureUrlFunction } from 'ol/featureloader'
import type { FeatureLike } from 'ol/Feature'

const serviceUrl = 'https://services-eu1.arcgis.com/NPIbx47lsIiu2pqz/ArcGIS/rest/services/'
  + 'Neptune_Coastline_Campaign_Open_Data_Land_Use_2014/FeatureServer/'
const layer = '0'

const fillColors: Record<string, number[]> = {
  'Lost To Sea Since 1965': [0, 0, 0, 1],
  'Urban/Built-up': [104, 104, 104, 1],
  'Shacks': [115, 76, 0, 1],
  'Industry': [230, 0, 0, 1],
  'Wasteland': [230, 0, 0, 1],
  'Caravans': [0, 112, 255, 0.5],
  'Defence': [230, 152, 0, 0.5],
  'Transport': [230, 152, 0, 1],
  'Open Countryside': [255, 255, 115, 1],
  'Woodland': [38, 115, 0, 1],
  'Managed Recreation/Sport': [85, 255, 0, 1],
  'Amenity Water': [0, 112, 255, 1],
  'Inland Water': [0, 38, 115, 1],
}

const style = new Style({
  fill: new Fill(),
  stroke: new Stroke({
    color: [0, 0, 0, 1],
    width: 0.5,
  }),
})

function getVectorLayerStyle(feature: FeatureLike) {
  const classify = feature.get('LU_2014')
  const color = fillColors[classify] || [0, 0, 0, 0]
  style.getFill().setColor(color)
  return style
}

const view = new View({
  center: fromLonLat([1.72, 52.4]),
  zoom: 14,
})

const featureUrlFunction: FeatureUrlFunction = (extent, _resolution, projection) => {
  // ArcGIS Server only wants the numeric portion of the projection ID.
  const srid = projection
    .getCode()
    .split(/:(?=\d+$)/)
    .pop()

  const url
      = `${serviceUrl
      + layer
      }/query/?f=json&`
      + `returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=${
      encodeURIComponent(
        `{"xmin":${
          extent[0]
          },"ymin":${
          extent[1]
          },"xmax":${
          extent[2]
          },"ymax":${
          extent[3]
          },"spatialReference":{"wkid":${
          srid
          }}}`,
      )
      }&geometryType=esriGeometryEnvelope&inSR=${
      srid
      }&outFields=*`
      + `&outSR=${
      srid}`

  return url
}
</script>

<template>
  <div style="height:400px;width:100%">
    <VMap :view="view">
      <VLayer.Tile>
        <VSource.XYZ
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          attributions="Tiles © <a href='https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer'>ArcGIS</a>"
        />
      </VLayer.Tile>
      <VLayer.Vector :style="getVectorLayerStyle" :opacity="0.7">
        <VSource.Vector
          :format="new EsriJSON()"
          :url="featureUrlFunction"
          :strategy="tileStrategy(createXYZ({ tileSize: 512 }))"
          attributions="University of Leicester (commissioned by the <a href='https://www.arcgis.com/home/item.html?id=d5f05b1dc3dd4d76906c421bc1727805'>National Trust</a>)"
        />
      </VLayer.Vector>
    </VMap>
  </div>
</template>
