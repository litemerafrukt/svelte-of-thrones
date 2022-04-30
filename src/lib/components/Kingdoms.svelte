<script lang="ts">
import type { KingdomBoundary } from '$lib/models/kingdoms'
import { getContext, onMount } from 'svelte'
import Kingdom from './Kingdom.svelte'

export let boundaries: KingdomBoundary[]
export let selected: number | null

const { getMap } = getContext<{ getMap: () => mapboxgl.Map }>('mapbox-gl')
const map = getMap()

boundaries.forEach((boundary) => {
  const gid = boundary.properties.gid
  const sourceId = `kingdom-boundary-${gid}`

  map.addSource(sourceId, {
    type: 'geojson',
    data: boundary
  })
})
</script>

{#each boundaries as boundary (`${boundary.properties.gid}-${selected === boundary.properties.gid}`)}
  <Kingdom {boundary} isSelected={selected === boundary.properties.gid} />
{/each}
