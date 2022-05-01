<script lang="ts" context="module">
import type { LoadInput } from '@sveltejs/kit'

export async function load({ params, fetch, session, stuff }: LoadInput) {
  const selected = Number(params.gid)

  return {
    props: {
      selected
    }
  }
}
</script>

<script lang="ts">
export let selected: number
</script>

<h1>Info panel {selected}</h1>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque, nisi eu
  vestibulum consectetur, eros nisi volutpat lectus, eget condimentum nisl nisl sed nunc.
  Donec eget consectetur eros. Donec eget consectetur eros.
</p>
