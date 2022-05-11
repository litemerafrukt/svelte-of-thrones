<script lang="ts">
import type { LocationSummary } from '$lib/models/locations'

export let location: LocationSummary
</script>

<h2>{location.name}</h2>
<p>
  {location.summary}
</p>

<a href={location.url}>more...</a>

<style>
p {
  font-size: smaller;
}
</style>
