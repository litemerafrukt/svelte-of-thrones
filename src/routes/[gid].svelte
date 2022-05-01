<script lang="ts" context="module">
import { isObjectEmpty } from '$lib/utilities/isObjectEmpty'

import type { LoadInput } from '@sveltejs/kit'

const kingdomSummaryCache = new Map<number, any>()

export async function load({ params, fetch, session, stuff }: LoadInput) {
  const selected = Number(params.gid)

  if (!kingdomSummaryCache.has(selected)) {
    const summary = await fetch(`/api/kingdoms/summary/${selected}`).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load kingdom summary')
      }

      return response.json()
    })

    if (isObjectEmpty(summary)) {
      throw new Error(`No kingdom summary for ${selected}`)
    }
    kingdomSummaryCache.set(selected, summary)
  }

  const kingdom = {
    name: (stuff as any).kingdomNames[selected],
    summary: kingdomSummaryCache.get(selected)
  }

  return {
    props: { kingdom }
  }
}
</script>

<script lang="ts">
export let kingdom: any
</script>

<h1>{kingdom.name}</h1>
<p>
  {kingdom.summary.summary}
</p>

<a href={kingdom.summary.url}>{kingdom.summary.url}</a>
