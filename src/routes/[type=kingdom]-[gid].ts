import type { RequestHandler } from '@sveltejs/kit'
import { getKingdomSummary } from '$lib/models/kingdoms.server'
import { hashString } from '$lib/utilities/hashString'
import { isObjectEmpty } from '$lib/utilities/isObjectEmpty'

export const get: RequestHandler = async ({ params }) => {
  const gid = Number(params.gid)

  const kingdom = await getKingdomSummary(gid)

  if (!kingdom || isObjectEmpty(kingdom)) {
    throw new Error(`No kingdom summary for ${gid}`)
  }

  return {
    status: 200,
    body: { kingdom },
    headers: {
      ETag: hashString(JSON.stringify(kingdom))
    }
  }
}
