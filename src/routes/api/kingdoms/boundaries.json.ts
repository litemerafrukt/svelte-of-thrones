import { getKingdomBoundaries } from '$lib/models/kingdoms.server'

/** Respond with boundary geojson for all kingdoms */
export const get = async () => {
  try {
    const kingdomBoundaries = await getKingdomBoundaries()

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
