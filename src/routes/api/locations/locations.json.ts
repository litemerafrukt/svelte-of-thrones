import { locationPointTypes } from '$lib/models/locations'
import { getLocations } from '$lib/models/locations.server'

/** Respond with location geojson for all locations */
export const get = async () => {
  try {
    const locations = await Promise.all(
      locationPointTypes.map((locationType) => getLocations(locationType).then((locations) => ({
        type: locationType,
        locations,
      })))
    )

    return {
      status: 200,
      body: locations
    }
  } catch (err: any) {
    console.error(err)
    return {
      status: 500,
      body: { error: err.message }
    }
  }
}
