<script lang="ts">
import { locationId, type Location } from '$lib/models/locations'
import { removeLayer } from '$lib/utilities/mapBox/remove'
import { getContext, onDestroy, onMount } from 'svelte'

export let location: Location
export let isSelected: boolean

const { getMap } = getContext<{ getMap: () => mapboxgl.Map }>('mapbox-gl')
const map = getMap()

const gid = location.properties.gid
const sourceId = locationId(gid)
const markerId = `location-marker-${gid}`

onMount(() => {
  map.addLayer({
    id: markerId,
    type: 'symbol',
    source: sourceId,
    layout: {
      'icon-image': 'got-marker'
      // get the title from the source's "name" property
      // 'text-field': ['get', 'name'],
      // 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      // 'text-offset': [0, 1.25],
      // 'text-anchor': 'top'
    }
  })
})

onDestroy(() => {
  removeLayer(map, markerId)
})
</script>
