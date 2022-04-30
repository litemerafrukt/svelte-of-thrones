import { getKingdomBoundaries } from '$lib/models/kingdoms'

/**
 * Respond with boundary geojson for all kingdoms
 */
export const get = async ({ params }: { params: Record<string, string> }) => {
  try {
    const selectedKingdom = Number(params.gid)
    const kingdomBoundaries = await getKingdomBoundaries()

    return {
      status: 200,
      body: { kingdomBoundaries, selectedKingdom }
    }
  } catch (err: any) {
    console.error(err)
    return {
      status: 500,
      body: { error: err.message }
    }
  }
}
