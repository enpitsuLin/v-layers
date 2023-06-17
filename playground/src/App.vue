<script setup lang="ts">
import 'ol/ol.css'
import { Layer, Map, Source } from '@v-layers/core';
import { View } from 'ol';
import { FeatureUrlFunction } from 'ol/featureloader';
import EsriJSON from 'ol/format/EsriJSON';
import { tile as tileStrategy } from 'ol/loadingstrategy';
import { fromLonLat } from 'ol/proj';
import { XYZ } from 'ol/source';
import { Fill, Stroke, Style } from 'ol/style';
import { StyleFunction } from 'ol/style/Style';
import { createXYZ } from 'ol/tilegrid';

const defaultView = new View({
  center: fromLonLat([1.72, 52.4]),
  zoom: 14,
})

const serviceUrl =
  'https://services-eu1.arcgis.com/NPIbx47lsIiu2pqz/ArcGIS/rest/services/' +
  'Neptune_Coastline_Campaign_Open_Data_Land_Use_2014/FeatureServer/';
const layer = '0';

const fillColors: Record<string, [number, number, number, number]> = {
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
};

const style = new Style({
  fill: new Fill(),
  stroke: new Stroke({
    color: [0, 0, 0, 1],
    width: 0.5,
  }),
});

const getUrl: FeatureUrlFunction = (extent, _resolution, projection) => {
  // ArcGIS Server only wants the numeric portion of the projection ID.
  const srid = projection
    .getCode()
    .split(/:(?=\d+$)/)
    .pop();

  const url =
    serviceUrl +
    layer +
    '/query/?f=json&' +
    'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
    encodeURIComponent(
      '{"xmin":' +
      extent[0] +
      ',"ymin":' +
      extent[1] +
      ',"xmax":' +
      extent[2] +
      ',"ymax":' +
      extent[3] +
      ',"spatialReference":{"wkid":' +
      srid +
      '}}'
    ) +
    '&geometryType=esriGeometryEnvelope&inSR=' +
    srid +
    '&outFields=*' +
    '&outSR=' +
    srid;

  return url;
}

const attributions = `University of Leicester (commissioned by the <a href='https://www.arcgis.com/home/item.html?id=d5f05b1dc3dd4d76906c421bc1727805'>National Trust</a>`

const getLayerStyle: StyleFunction = (feature) => {
  const classify = feature.get('LU_2014');
  const color = fillColors[classify] || [0, 0, 0, 0];
  style.getFill().setColor(color);
  return style;
}

const rasterSource = new XYZ({
  attributions:
    'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
    'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
  url:
    'https://server.arcgisonline.com/ArcGIS/rest/services/' +
    'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
})
</script>

<template>
  <div style="height:300px;width:100%">
    <Map :view="defaultView">
      <Layer.Tile :source="rasterSource"></Layer.Tile>
      <Layer.Vector ref="VectorLayerRef" :style="getLayerStyle" :opacity="0.7">
        <Source.Vector :url="getUrl" :format="new EsriJSON()" :strategy="tileStrategy(createXYZ({ tileSize: 512 }))"
          :attributions="attributions" />
      </Layer.Vector>
    </Map>
  </div>
</template>

 