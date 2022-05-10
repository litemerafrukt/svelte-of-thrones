<script lang="ts">
import { getContext } from 'svelte'
import { Tabs } from './Tabs.svelte'

const panel = Symbol('panel')
const { registerPanel, selectedPanel } = getContext(Tabs)

registerPanel(panel)
</script>

{#if $selectedPanel === panel}
  <slot />
{/if}
