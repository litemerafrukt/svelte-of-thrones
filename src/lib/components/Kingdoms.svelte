<script lang="ts">
import { kingdomBoundaryId, type KingdomBoundary } from '$lib/models/kingdoms'
import { removeSource } from '$lib/utilities/mapBox/remove'
import { getContext, onDestroy, onMount } from 'svelte'
import Kingdom from './Kingdom.svelte'

export let boundaries: KingdomBoundary[]
export let selected: number | null

let sourceAdded = false

const { getMap } = getContext<{ getMap: () => mapboxgl.Map }>('mapbox-gl')
const map = getMap()

onMount(() => {
  boundaries.forEach((boundary) => {
    const gid = boundary.properties.gid
    const sourceId = kingdomBoundaryId(gid)

    map.addSource(sourceId, {
      type: 'geojson',
      data: boundary
    })
  })
  sourceAdded = true
})

onDestroy(() => {
  boundaries.forEach((boundary) => {
    const gid = boundary.properties.gid
    const sourceId = kingdomBoundaryId(gid)
    removeSource(map, sourceId)
  })
  sourceAdded = false
})
</script>

{#if sourceAdded}
  {#each boundaries as boundary (`${kingdomBoundaryId(boundary.properties.gid)}-${selected === boundary.properties.gid}`)}
    <Kingdom {boundary} isSelected={selected === boundary.properties.gid} />
  {/each}
{/if}
