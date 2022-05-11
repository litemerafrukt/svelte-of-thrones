<script lang="ts">
import type { LocationCollection } from '$lib/models/locations'
import { activeLayers } from './Layers.svelte'
import Location from './Location.svelte'

export let locationCollection: LocationCollection

$: locationLayers = locationCollection.filter(({ type }) => $activeLayers.includes(type))
</script>

{#each locationLayers as { type, locations } (type)}
  {#each locations as location}
    <Location {location} {type} />
  {/each}
{/each}
