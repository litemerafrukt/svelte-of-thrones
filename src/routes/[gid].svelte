<script lang="ts">
import type { KingdomSummary } from '$lib/models/kingdoms'

export let kingdom: KingdomSummary
</script>

<h1>{kingdom.name}</h1>
<p>
  {kingdom.summary}
</p>

<a href={kingdom.url}>more...</a>
