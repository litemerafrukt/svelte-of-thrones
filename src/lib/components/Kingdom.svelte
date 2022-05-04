<script lang="ts">
import { goto } from '$app/navigation'
import { kingdomBoundaryId, type KingdomBoundary } from '$lib/models/kingdoms'
import { removeLayer, removeSource } from '$lib/utilities/mapBox/remove'
import type mapboxgl from 'mapbox-gl'
import { getContext, onDestroy, onMount } from 'svelte'

export let boundary: KingdomBoundary
export let isSelected: boolean

const { getMap } = getContext<{ getMap: () => mapboxgl.Map }>('mapbox-gl')
const map = getMap()

const gid = boundary.properties.gid
const sourceId = kingdomBoundaryId(gid)
const fillLayerId = `kingdom-${gid}`
const outlineLayerId = `kingdom-outline-${gid}`
const fillColor = isSelected ? '#0a0' : '#222'
const onClick = () => {
  if (isSelected) {
    goto(`/`)
  } else {
    goto(`${gid}`)
  }
}

onMount(() => {
  map
    .addLayer({
      id: fillLayerId,
      metadata: { type: 'kingdom', gid },
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': fillColor,
        'fill-opacity': 0.15
      }
    })
    .addLayer({
      id: outlineLayerId,
      metadata: { type: 'kingdom', gid },
      type: 'line',
      source: sourceId,
      paint: {
        'line-color': '#222',
        'line-opacity': 0.65
      }
    })
    .on('click', fillLayerId, onClick)
})

onDestroy(() => {
  map.off('click', fillLayerId, onClick)
  removeLayer(map, outlineLayerId)
  removeLayer(map, fillLayerId)
})
</script>
