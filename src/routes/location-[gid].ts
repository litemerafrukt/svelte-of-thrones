import type { RequestHandler } from '@sveltejs/kit'
import { getLocationSummary } from '$lib/models/locations.server'
import { hashString } from '$lib/utilities/hashString'
import { isObjectEmpty } from '$lib/utilities/isObjectEmpty'

export const get: RequestHandler = async ({ params }) => {
  const gid = Number(params.gid)

  const location = await getLocationSummary(gid)

  if (!location || isObjectEmpty(location)) {
    throw new Error(`No location summary for ${gid}`)
  }

  return {
    status: 200,
    body: { location },
    headers: {
      ETag: hashString(JSON.stringify(location))
    }
  }
}
