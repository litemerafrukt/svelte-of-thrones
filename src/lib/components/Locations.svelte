<script lang="ts">
import type { LocationCollection } from '$lib/models/locations'
import Location from './Location.svelte'

export let locationCollection: LocationCollection
// export let selected: number | null
</script>

{#each locationCollection as { type, locations }}
  {#each locations as location}
    <Location {location} {type} />
  {/each}
{/each}
