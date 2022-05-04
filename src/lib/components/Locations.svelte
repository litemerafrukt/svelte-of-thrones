<script lang="ts">
import { locationId, type Location as LocType } from '$lib/models/locations'
import { addImageByUrl } from '$lib/utilities/mapBox/loadImage'
import { removeSource } from '$lib/utilities/mapBox/remove'
import { getContext, onDestroy, onMount } from 'svelte'
import Location from './Location.svelte'

export let locations: LocType[]
$: flatLocations = locations.flat()
export let selected: number | null

let sourceAdded = false

const { getMap } = getContext<{ getMap: () => mapboxgl.Map }>('mapbox-gl')
const map = getMap()

onMount(async () => {
  await addImageByUrl(map, 'got-marker', 'icons/castle.png')

  flatLocations.forEach((location) => {
    const gid = location.properties.gid
    const sourceId = locationId(gid)

    map.addSource(sourceId, {
      type: 'geojson',
      data: location
    })
  })
  sourceAdded = true
})

onDestroy(() => {
  flatLocations.forEach((location) => {
    const gid = location.properties.gid
    const sourceId = locationId(gid)
    removeSource(map, sourceId)
  })
  sourceAdded = false
})
</script>

{#if sourceAdded}
  {#each flatLocations as location (`${locationId(location.properties.gid)}-${selected === location.properties.gid}`)}
    <Location {location} isSelected={selected === location.properties.gid} />
  {/each}
{/if}
