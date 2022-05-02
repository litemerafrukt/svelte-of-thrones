import { addRowMetadataAsProperties } from './db/addRowMetadataAsProperties'
import * as Q from './db/queries'
import type { Location, LocationPointType, LocationSummary } from './locations'
import { wrapGeometryAsGeoJson } from './wrapGeometryAsGeoJson'

export const getLocations = async (type: LocationPointType): Promise<Location[]> => {
  const locs = await Q.getLocations(type)
  if (locs.length === 0) {
    return Promise.reject('No locations found')
  }

  const locations = locs.map((row) =>
    wrapGeometryAsGeoJson(addRowMetadataAsProperties(row, 'name', 'type', 'gid'))
  )

  return locations as Location[]
}

export const getLocationSummary = async (gid: number): Promise<LocationSummary> => {
  const [summary] = await Q.getSummary('locations', gid)

  return summary as LocationSummary
}
