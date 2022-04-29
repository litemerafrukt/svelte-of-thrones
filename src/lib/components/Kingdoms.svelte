<script lang="ts">
import type { KingdomBoundary } from '$lib/models/kingdoms'
import type mapboxgl from 'mapbox-gl'
import { onMount, createEventDispatcher, getContext } from 'svelte'

export let boundaries: KingdomBoundary[]

const { getMap } = getContext<{ getMap: () => mapboxgl.Map }>('mapbox-gl')
const map = getMap()

const dispatch = createEventDispatcher()

const kingdomsStyle = {
  color: '#222',
  weight: 1,
  opacity: 0.65
}

onMount(async () => {
  boundaries.forEach(async (boundary) => {
    const gid = boundary.properties.gid
    const id = `kingdom-boundary-${gid}`

    await map
      .addSource(id, {
        type: 'geojson',
        data: boundary
      })
      .addLayer({
        id: `kingdom-${gid}`,
        metadata: { type: 'kingdom', gid },
        type: 'fill',
        source: id,
        paint: {
          'fill-color': '#222',
          'fill-opacity': 0.15
        }
      })
      .addLayer({
        id: `kingdom-outline-${gid}`,
        metadata: { type: 'kingdom', gid },
        type: 'line',
        source: id,
        paint: {
          'line-color': '#222',
          'line-opacity': 0.65
        }
      })
  })
})
</script>
