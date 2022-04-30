<script lang="ts">
import Kingdoms from '$lib/components/Kingdoms.svelte'

import MapOfWesteros from '$lib/components/MapOfWesteros.svelte'
import type { KingdomBoundary } from '$lib/models/kingdoms'

export let kingdomBoundaries: KingdomBoundary[]
</script>

<MapOfWesteros>
  <Kingdoms boundaries={kingdomBoundaries} />
</MapOfWesteros>
