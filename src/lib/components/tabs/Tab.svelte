<script lang="ts">
import { getContext } from 'svelte'
import { Tabs } from './Tabs.svelte'

const tab = Symbol('tab')
const { registerTab, handleTabClick, selectedTab } = getContext(Tabs)

registerTab(tab)
</script>

<button class:selected={$selectedTab === tab} on:click={() => handleTabClick(tab)}>
  <slot />
</button>
