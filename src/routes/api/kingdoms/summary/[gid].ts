import { getKingdomSummary } from '$lib/models/kingdoms.server'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ params }) => {
  const gid = Number(params.gid)

  try {
    const kingdomBoundaries = await getKingdomSummary(gid)

    return {
      status: 200,
      body: kingdomBoundaries
    }
  } catch (err: any) {
    console.error(err)
    return {
      status: 500,
      body: { error: err.message }
    }
  }
}
