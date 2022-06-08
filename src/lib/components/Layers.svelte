<script lang="ts" context="module">
import { type LocationPointType, locationPointTypes } from '$lib/models/locations'
import { writable } from 'svelte/store'

const layers: (LocationPointType | 'kingdom')[] = ['kingdom', ...locationPointTypes]

export let activeLayers = writable<(LocationPointType | 'kingdom')[]>([...layers])
</script>

<script lang="ts">
$: console.log($activeLayers)
</script>

{#each layers as layer}
  <div>
    <label class="layer">
      <input type="checkbox" name="layers" value={layer} bind:group={$activeLayers} />
      {layer}</label
    >
  </div>
{/each}

<style>
.layer {
  text-transform: capitalize;
}
</style>
