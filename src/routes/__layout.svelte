<script lang="ts">
import { page } from '$app/stores'

$: gid = $page.url.pathname.split('/').pop()
</script>

<h1>Info for {gid}</h1>

<slot />
