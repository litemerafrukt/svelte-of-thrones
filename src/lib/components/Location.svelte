<script lang="ts">
import type { Location, LocationPointType } from '$lib/models/locations'
import mapboxgl from 'mapbox-gl'
import { getContext, onDestroy, onMount } from 'svelte'

export let location: Location
export let type: LocationPointType

const { getMap } = getContext<{ getMap: () => mapboxgl.Map }>('mapbox-gl')
const map = getMap()

function mapMarker(element: HTMLElement) {
  const marker = new mapboxgl.Marker(element)
    .setLngLat(location.geometry.coordinates as mapboxgl.LngLatLike)
    .addTo(map)

  return {
    destroy() {
      marker.remove()
    }
  }
}
</script>

<div class="marker" use:mapMarker />

<style>
.marker {
  display: block;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
}
</style>
