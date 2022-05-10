<script lang="ts" context="module">
export const Tabs = Symbol('tabs')
</script>

<script lang="ts">
import { setContext, onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import * as A from '$lib/utilities/array'

let tabs: symbol[] = []
let panels: symbol[] = []
const selectedTab = writable<symbol | undefined>(undefined)
const selectedPanel = writable<symbol | undefined>(undefined)

function registerTab(tab: symbol) {
  tabs = A.add(tabs, tab)
  selectedTab.update((current) => current ?? tab)

  onDestroy(() => {
    tabs = A.remove(tabs, tab)
    selectedTab.update((current) => (current === tab ? tabs.at(0) : current))
  })
}

function registerPanel(panel: symbol) {
  panels = A.add(panels, panel)
  selectedPanel.update((current) => current ?? panel)

  onDestroy(() => {
    panels = A.remove(panels, panel)
    selectedPanel.update((current) => (current === panel ? panels.at(0) : current))
  })
}

function handleTabClick(tab: symbol) {
  selectedTab.set(tab)
  selectedPanel.set(panels.at(tabs.indexOf(tab)))
}

setContext(Tabs, {
  registerTab,
  registerPanel,
  handleTabClick,
  selectedTab,
  selectedPanel
})
</script>

<div class="tabs">
  <slot />
</div>

<style>
</style>
