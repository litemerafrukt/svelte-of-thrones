<script lang="ts">
import type { Location, LocationPointType } from '$lib/models/locations'
import { mapMarker } from '$lib/actions/mapMarker'

export let location: Location
export let type: LocationPointType

const coordinates = location.geometry.coordinates as mapboxgl.LngLatLike
</script>

<div
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
