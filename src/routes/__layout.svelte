<script lang="ts" context="module">
import type { LoadInput } from '@sveltejs/kit'

let kingdomBoundaries: KingdomBoundary[]

export async function load({ params, fetch, session, stuff }: LoadInput) {
  try {
    if (!kingdomBoundaries) {
      kingdomBoundaries = await fetch('/api/kingdoms/boundaries.json').then(
        (response) => {
          if (!response.ok) {
            throw new Error('Failed to load kingdom boundaries')
          }
          return response.json()
        }
      )
    }

    let selectedKingdom: number | null = Number(params.gid)
    if (Number.isNaN(selectedKingdom)) selectedKingdom = null

    const kingdomNames = kingdomBoundaries.reduce((names, boundary) => {
      names[boundary.properties.gid] = boundary.properties.name
      return names
    }, {} as { [gid: number]: string })

    return {
      status: 200,
      stuff: { kingdomNames },
      props: {
        selectedKingdom,
        kingdomBoundaries
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
import Kingdoms from '$lib/components/Kingdoms.svelte'

import MapOfWesteros from '$lib/components/MapOfWesteros.svelte'
import type { KingdomBoundary } from '$lib/models/kingdoms'
import { page } from '$app/stores'

export let kingdomBoundaries: KingdomBoundary[]
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
