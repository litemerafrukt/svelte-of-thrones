<script lang="ts">
import { kingdomBoundaryId, type KingdomBoundary } from '$lib/models/kingdoms'
import { removeSource } from '$lib/utilities/mapBox/remove'
import { getContext, onDestroy, onMount } from 'svelte'
import Kingdom from './Kingdom.svelte'
import { activeLayers } from './Layers.svelte'

export let boundaries: KingdomBoundary[]
export let selected: number | null

let sourceAdded = false

const { getMap } = getContext<{ getMap: () => mapboxgl.Map }>('mapbox-gl')
const map = getMap()

onMount(() => {
  boundaries.forEach((boundary) => {
    const gid = boundary.properties.gid
    map.addSource(kingdomBoundaryId(gid), {
      type: 'geojson',
      data: boundary
    })
  })
  sourceAdded = true
})

onDestroy(() => {
  boundaries.forEach((boundary) => {
    const gid = boundary.properties.gid
    removeSource(map, kingdomBoundaryId(gid))
  })
  sourceAdded = false
})

$: shouldShowKingdoms = $activeLayers.includes('kingdom')
</script>

{#if sourceAdded && shouldShowKingdoms}
  {#each boundaries as boundary (`${kingdomBoundaryId(boundary.properties.gid)}-${selected === boundary.properties.gid}`)}
    <Kingdom {boundary} isSelected={selected === boundary.properties.gid} />
  {/each}
{/if}
