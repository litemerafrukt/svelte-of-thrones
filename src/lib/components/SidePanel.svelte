<script lang="ts">
import { Tabs, TabList, TabPanel, Tab } from '$lib/components/tabs/Index.svelte'
import Layers from './Layers.svelte'
</script>

<Tabs>
  <div class="tab-layout">
    <TabList>
      <Tab><img src="/icons/info.svg" alt="info" /></Tab>
      <Tab><img src="/icons/layers.svg" alt="layers" /></Tab>
      <Tab><img src="/icons/search.svg" alt="search" /></Tab>
    </TabList>

    <TabPanel>
      <div class="panel-wrap">
        <slot />
      </div>
    </TabPanel>

    <TabPanel>
      <div class="panel-wrap">
        <h2>Layers</h2>
        <Layers />
      </div>
    </TabPanel>

    <TabPanel>
      <div class="panel-wrap">
        <h2>Search</h2>
      </div>
    </TabPanel>
  </div>
</Tabs>

<style>
.tab-layout {
  display: grid;
  grid-template-columns: 37px 1fr;
  column-gap: 10px;
}
</style>
