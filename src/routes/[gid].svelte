<script lang="ts">
import Kingdoms from '$lib/components/Kingdoms.svelte'

import MapOfWesteros from '$lib/components/MapOfWesteros.svelte'
import type { KingdomBoundary } from '$lib/models/kingdoms'

export let kingdomBoundaries: KingdomBoundary[]
export let selectedKingdom: number | null = null
</script>

<MapOfWesteros>
  <Kingdoms boundaries={kingdomBoundaries} selected={selectedKingdom} />
</MapOfWesteros>
