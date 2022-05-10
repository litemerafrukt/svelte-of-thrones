<script lang="ts" context="module">
export const Tabs = Symbol('tabs')
</script>

<script lang="ts">
import { setContext, onDestroy } from 'svelte'
import { writable } from 'svelte/store'

const tabs: symbol[] = []
const panels: symbol[] = []
const selectedTab = writable<symbol | undefined>(undefined)
const selectedPanel = writable<symbol | undefined>(undefined)

function registerTab(tab: symbol) {
  tabs.push(tab)
  selectedTab.update((current) => current ?? tab)

  onDestroy(() => {
    const tabIndex = tabs.indexOf(tab)
    if (tabIndex !== -1) tabs.splice(tabIndex, 1)
    selectedTab.update((current) => (current === tab ? tabs.at(tabIndex) : current))
  })
}

function registerPanel(panel: symbol) {
  panels.push(panel)
  selectedPanel.update((current) => current ?? panel)

  onDestroy(() => {
    const panelIndex = panels.indexOf(panel)
    if (panelIndex !== -1) panels.splice(panelIndex, 1)
    selectedPanel.update((current) =>
      current === panel ? panels.at(panelIndex) : current
    )
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
