<template>
  <div>
    <router-link to="/accessible">
      Accessible Map
    </router-link>
    <p>(accessible.vue)</p>
    <p> Example of an accessible map. </p>
  </div>
  <div>
    <router-link to="/center">
      Advanced View Positioning
    </router-link>
    <p>(center.vue)</p>
    <p>
      This example demonstrates how a map's view can be adjusted so a geometry or coordinate is positioned at a specific
      pixel location.
    </p>
  </div>
  <div>
    <router-link to="/vector-esri">
      ArcGIS REST Feature Service
    </router-link>
    <p>(vector-esri.vue)</p>
    <p>Example of using an ArcGIS REST Feature Service with a Tile strategy.</p>
  </div>
</template>
