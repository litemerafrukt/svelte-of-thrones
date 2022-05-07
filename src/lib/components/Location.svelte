<script lang="ts">
import type { Location, LocationPointType } from '$lib/models/locations'
import { mapMarker } from '$lib/actions/mapMarker'
import { goto } from '$app/navigation'

export let location: Location
export let type: LocationPointType

const gid = location.properties.gid
const coordinates = location.geometry.coordinates as mapboxgl.LngLatLike

const handleClick = () => {
  goto(`location-${gid}`)
}
</script>

<div
  on:click|stopPropagation={handleClick}
  class="marker"
  style={`background-image: url(/icons/${type}.svg)`}
  use:mapMarker={{ coordinates }}
/>

<style>
.marker {
  display: block;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
