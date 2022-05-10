<script lang="ts" context="module">
import type { LoadInput } from '@sveltejs/kit'

let layerCache: {
  kingdomBoundaries: KingdomBoundary[]
  locations: LocationCollection[]
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
        locationCollection: layerCache.locations
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
import 'core-js/proposals/change-array-by-copy'
import MapOfWesteros from '$lib/components/MapOfWesteros.svelte'
import Kingdoms from '$lib/components/Kingdoms.svelte'
import Locations from '$lib/components/Locations.svelte'
import type { KingdomBoundary } from '$lib/models/kingdoms'
import type { LocationCollection } from '$lib/models/locations'
import { page } from '$app/stores'
import SidePanel from '$lib/components/SidePanel.svelte'

export let kingdomBoundaries: KingdomBoundary[]
export let locationCollection: LocationCollection
export let selectedKingdom: number | null = null

page.subscribe((state) => {
  if (state.params.type === 'kingdom' && state.params.gid) {
    selectedKingdom = Number(state.params.gid)
  } else {
    selectedKingdom = null
  }
})
</script>

<div class="layout-wrap">
  <div class="info-panel">
    <SidePanel>
      <slot />
    </SidePanel>
  </div>

  <div class="map">
    <MapOfWesteros>
      <Kingdoms boundaries={kingdomBoundaries} selected={selectedKingdom} />
      <Locations {locationCollection} />
    </MapOfWesteros>
  </div>
</div>

<style>
.layout-wrap {
  display: grid;
  grid-template-columns: 430px 1fr;
  height: 100%;
  width: 100%;
}

.info-panel {
  display: inline;
  color: #aaa;
  background-color: #222;
  padding: 5px;
}

.map {
  display: inline;
}
</style>
