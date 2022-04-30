<script lang="ts">
import { page } from '$app/stores'

$: gid = $page.url.pathname.split('/').pop()
</script>

<div class="layout-wrap">
  <div class="info-panel">
    <h1>Info panel {gid}</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque, nisi
      eu vestibulum consectetur, eros nisi volutpat lectus, eget condimentum nisl nisl sed
      nunc. Donec eget consectetur eros. Donec eget consectetur eros.
    </p>
  </div>

  <div class="map">
    <slot />
  </div>
</div>

<style>
.layout-wrap {
  display: flex;
  height: 100%;
  width: 100%;
}

.info-panel {
  color: #aaa;
  background-color: #222;
  flex-basis: 30%;
  padding: 1rem;
}

.map {
  flex-basis: 70%;
  max-width: 70%;
}
</style>
