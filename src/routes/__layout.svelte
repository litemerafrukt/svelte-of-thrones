<script lang="ts" context="module">
import type { LoadInput } from '@sveltejs/kit'

export async function load({ params, fetch, session, stuff }: LoadInput) {
  try {
    const kingdomBoundaries = await fetch('/kingdom-boundaries.json').then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load kingdom boundaries')
      }
      return response.json()
    })

    const selectedKingdom = Number(params.gid)

    return {
      status: 200,
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

export let kingdomBoundaries: KingdomBoundary[]
export let selectedKingdom: number | null = null
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
}

.map {
  flex-basis: 70%;
  max-width: 70%;
}
</style>
