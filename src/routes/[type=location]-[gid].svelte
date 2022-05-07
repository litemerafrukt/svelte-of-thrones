<script lang="ts">
import type { LocationSummary } from '$lib/models/locations'

export let location: LocationSummary
</script>

<h1>{location.name}</h1>
<p>
  {location.summary}
</p>

<a href={location.url}>more...</a>
