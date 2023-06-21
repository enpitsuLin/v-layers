<script setup lang="ts">
import 'ol/ol.css'

import { VLayer, VMap, VSource } from '@v-layers/components'
import View from 'ol/View'
import type WebGLTileLayer from 'ol/layer/WebGLTile'
import { ref } from 'vue'

const layer = ref<WebGLTileLayer>()

const view = new View({
  projection: 'EPSG:4326',
  center: [0, 0],
  zoom: 2,
  maxZoom: 6,
})

function update() {
  if (!layer.value)
    return
  layer.value.updateStyleVariables(getVariables())
}

const channels = ['red', 'green', 'blue'] as const
function getVariables() {
  const variables: Partial<Record<typeof channels[number] | `${typeof channels[number]}Max`, number>> = {}
  for (const channel of channels) {
    const selector = document.getElementById(channel) as HTMLSelectElement
    variables[channel] = Number.parseInt(selector.value, 10)

    const inputId = `${channel}Max` as `${typeof channels[number]}Max`
    const input = document.getElementById(inputId) as HTMLInputElement
    variables[inputId] = Number.parseInt(input.value, 10)
  }
  return variables
}
</script>

<template>
  <div style="height:300px;width:100%">
    <VMap :view="view">
      <VLayer.WebGLTile
        ref="layer"
        :style="{
          variables: getVariables(),
          color: [
            'array',
            ['/', ['band', ['var', 'red']], ['var', 'redMax']],
            ['/', ['band', ['var', 'green']], ['var', 'greenMax']],
            ['/', ['band', ['var', 'blue']], ['var', 'blueMax']],
            1,
          ],
        }"
      >
        <VSource.GeoTIFF
          :normalize="false"
          :sources="[{ url: 'https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits_sinlge-file_z0-4.tif' }]"
        />
      </VLayer.WebGLTile>
    </VMap>
  </div>
  <div class="controls">
    <label for="red">Red channel</label>
    <select id="red" @change="update()">
      <option value="1" selected>
        visible red
      </option>
      <option value="2">
        visible green
      </option>
      <option value="3">
        visible blue
      </option>
      <option value="4">
        near infrared
      </option>
    </select>
    <label>max
      <input id="redMax" type="range" value="3000" min="2000" max="5000" @input="update()">
    </label>

    <label for="green">Green channel</label>
    <select id="green" @change="update()">
      <option value="1">
        visible red
      </option>
      <option value="2" selected>
        visible green
      </option>
      <option value="3">
        visible blue
      </option>
      <option value="4">
        near infrared
      </option>
    </select>
    <label>max
      <input id="greenMax" type="range" value="3000" min="2000" max="5000" @input="update()">
    </label>

    <label for="blue">Blue channel</label>
    <select id="blue" @change="update()">
      <option value="1">
        visible red
      </option>
      <option value="2">
        visible green
      </option>
      <option value="3" selected>
        visible blue
      </option>
      <option value="4">
        near infrared
      </option>
    </select>
    <label>max
      <input id="blueMax" type="range" value="3000" min="2000" max="5000" @input="update()">
    </label>
  </div>
</template>

<style>
.controls {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: baseline;
  gap: 0 1em;
}
</style>
