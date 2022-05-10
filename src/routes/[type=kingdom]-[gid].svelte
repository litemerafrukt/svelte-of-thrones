<script lang="ts">
import type { KingdomSummary } from '$lib/models/kingdoms'

export let kingdom: KingdomSummary
</script>

<h2>{kingdom.name}</h2>
<p>
  {kingdom.summary}
</p>

<a href={kingdom.url}>more...</a>
