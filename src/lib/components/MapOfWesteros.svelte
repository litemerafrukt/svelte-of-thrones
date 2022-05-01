<script lang="ts">
import { browser } from '$app/env'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { onDestroy, onMount, setContext } from 'svelte'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

let container: HTMLDivElement | null = null
let map: mapboxgl.Map | null = null
let isLoaded = false

setContext('mapbox-gl', {
  getMap: () => map
})

onMount(() => {
  if (!map && browser && container) {
    map = new mapboxgl.Map({
      container,
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: [
              'https://cartocdn-gusc.global.ssl.fastly.net/ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png'
            ],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 2,
            maxzoom: 7
          }
        ]
      },
      maxBounds: [
        [-20, -40],
        [90, 45]
      ],
      maxZoom: 6,
      center: [21, 13],
      zoom: 3.5
    }).on('load', () => {
      isLoaded = true
    })
  }
})

onDestroy(() => {
  map?.remove()
  map = null
})
</script>

<div class="map-container" bind:this={container}>
  {#if map && isLoaded}
    <slot />
  {/if}
</div>

<style>
.map-container {
  width: 100vw;
  height: 100vh;
}
</style>
