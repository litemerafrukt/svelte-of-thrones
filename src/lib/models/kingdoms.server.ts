import { addRowMetadataAsProperties } from './db/addRowMetadataAsProperties'
import * as Q from './db/queries'
import type { KingdomBoundary, KingdomSummary } from './kingdoms'
import { wrapGeometryAsGeoJson } from './wrapGeometryAsGeoJson'

export const getKingdomBoundaries = async (): Promise<KingdomBoundary[]> => {
  const boundaries = await Q.getKingdomBoundaries()
  if (boundaries.length === 0) {
    return Promise.reject(new Error('No kingdom boundaries found'))
  }

  const kingdomBoundaries = boundaries.map((row) =>
    wrapGeometryAsGeoJson(addRowMetadataAsProperties(row, 'name', 'gid'))
  )

  return kingdomBoundaries as KingdomBoundary[]
}

export const getKingdomSummary = async (gid: number): Promise<KingdomSummary> => {
  const [summary] = await Q.getSummary('kingdoms', gid)

  return summary as KingdomSummary
}
