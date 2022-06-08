import type { RequestHandler } from '@sveltejs/kit'
import { hashString } from '$lib/utilities/hashString'
import { isObjectEmpty } from '$lib/utilities/isObjectEmpty'
import { getSummary } from '$lib/models/summary.server'
import type { Infoble } from 'src/params/infoble'

export const get: RequestHandler = async ({ params }) => {
  const gid = Number(params.gid)
  const type: 'kingdoms' | 'locations' = `${params.type as Infoble}s`

  const location = await getSummary(type, gid)

  if (!location || isObjectEmpty(location)) {
    throw new Error(`No ${type} summary for ${gid}`)
  }

  return {
    status: 200,
    body: { location },
    headers: {
      'Cache-Control': 'max-age=86400',
      ETag: hashString(JSON.stringify(location))
    }
  }
}
