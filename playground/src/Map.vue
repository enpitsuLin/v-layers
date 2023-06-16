<script setup lang="ts">
import { ref, useSlots, watchPostEffect } from 'vue';
import { createVLayers } from '@v-layers/core'
import { Map, View } from 'ol';

const slots = useSlots()
const container = ref<HTMLElement>()

watchPostEffect(() => {
  const map = new Map({
    target: container.value, view: new View({
      center: [0, 0], zoom: 4
    })
  })
  const app = createVLayers(slots)
  app.mount(map)
})
</script>

<template>
  <div ref="container" style="height:100%;width:100%" />
</template>
