<script lang="ts">
import mapboxgl from 'mapbox-gl'
import { onMount } from 'svelte'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

let container: HTMLDivElement | null = null
let map: mapboxgl.Map | null = null

onMount(() => {
  if (!container) throw new Error("Can't create map on null container")

  map = new mapboxgl.Map({
    container, // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
  })
})
</script>

<div bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>

<style>
div {
  width: 100vw;
  height: 100vh;
}
</style>
