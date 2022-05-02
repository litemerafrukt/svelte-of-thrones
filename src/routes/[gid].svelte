<script lang="ts" context="module">
import type { KingdomSummary } from '$lib/models/kingdoms'

import { isObjectEmpty } from '$lib/utilities/isObjectEmpty'
import type { LoadInput } from '@sveltejs/kit'

const kingdomSummaryCache = new Map<number, KingdomSummary>()

export async function load({ params, fetch, session, stuff }: LoadInput) {
  const selected = Number(params.gid)

  if (!kingdomSummaryCache.has(selected)) {
    const summary: KingdomSummary = await fetch(`/api/kingdoms/summary/${selected}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error('Failed to load kingdom summary')
        }

        return response.json()
      }
    )

    if (isObjectEmpty(summary)) {
      throw new Error(`No kingdom summary for ${selected}`)
    }
    kingdomSummaryCache.set(selected, summary)
  }

  return {
    props: { kingdom: kingdomSummaryCache.get(selected) }
  }
}
</script>

<script lang="ts">
export let kingdom: KingdomSummary
</script>

<h1>{kingdom.name}</h1>
<p>
  {kingdom.summary}
</p>

<a href={kingdom.url}>{kingdom.url}</a>
