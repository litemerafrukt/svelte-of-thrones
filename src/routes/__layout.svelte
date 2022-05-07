<script lang="ts" context="module">
import type { LoadInput } from '@sveltejs/kit'

let layerCache: {
  kingdomBoundaries: KingdomBoundary[]
  locations: Location[]
} | null = null

async function fetchCachedLayoutData(
  fetch: LoadInput['fetch']
): Promise<NonNullable<typeof layerCache>> {
  if (!layerCache) {
    const [kingdomBoundaries, locations] = await Promise.all([
      fetch('/api/kingdoms/boundaries.json').then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load kingdom boundaries')
        }
        return response.json()
      }),
      fetch('/api/locations/locations.json').then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load locations')
        }
        return response.json()
      })
    ])
    layerCache = {
      kingdomBoundaries,
      locations
    }
  }

  return layerCache
}

export async function load({ params, fetch, session, stuff }: LoadInput) {
  try {
    const layerCache = await fetchCachedLayoutData(fetch)

    let selectedKingdom: number | null = Number(params.gid)
    if (Number.isNaN(selectedKingdom)) selectedKingdom = null

    return {
      status: 200,
      props: {
        selectedKingdom,
        kingdomBoundaries: layerCache.kingdomBoundaries,
        locations: layerCache.locations
      }
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }
}
</script>

<script lang="ts">
import MapOfWesteros from '$lib/components/MapOfWesteros.svelte'
import Kingdoms from '$lib/components/Kingdoms.svelte'
import Locations from '$lib/components/Locations.svelte'
import type { KingdomBoundary } from '$lib/models/kingdoms'
import type { Location } from '$lib/models/locations'
import { page } from '$app/stores'

export let kingdomBoundaries: KingdomBoundary[]
export let locations: Location[]
export let selectedKingdom: number | null = null

page.subscribe((state) => {
  if (state.params.gid) {
    selectedKingdom = Number(state.params.gid)
  }
})
</script>

<div class="layout-wrap">
  <div class="info-panel">
    <slot />
  </div>

  <div class="map">
    <MapOfWesteros>
      <Kingdoms boundaries={kingdomBoundaries} selected={selectedKingdom} />
      <!-- <Locations {locations} selected={null} /> -->
    </MapOfWesteros>
  </div>
</div>

<style>
.layout-wrap {
  display: flex;
  height: 100%;
  width: 100%;
}

.info-panel {
  color: #aaa;
  background-color: #222;
  flex-basis: 30%;
  padding: 1rem;
  width: 30%;
}

.map {
  flex-basis: 70%;
  width: 70%;
}
</style>
