import { addRowMetadataAsProperties } from './db/addRowMetadataAsProperties'
import { getKingdomBoundaries as qKingdomBoundaries } from './db/queries'

export type KingdomPolygon = {
  type: 'MultiPolygon'
  coordinates: GeoJSON.Position[][][]
  properties: { name: string; gid: number }
}

export type KingdomBoundary = GeoJSON.Feature & {
  properties: { name: string; gid: number }
}

const wrapKingdomAsGeoJson = (geometry: KingdomPolygon): KingdomBoundary => ({
  type: 'Feature',
  geometry,
  properties: geometry.properties
})

export const getKingdomBoundaries = async (): Promise<KingdomBoundary[]> => {
  const boundaries = await qKingdomBoundaries()
  if (boundaries.length === 0) {
    return Promise.reject(new Error('No kingdom boundaries found'))
  }

  const kingdomBoundaries = boundaries.map((row) =>
    wrapKingdomAsGeoJson(addRowMetadataAsProperties(row, 'name', 'gid'))
  )

  return kingdomBoundaries as KingdomBoundary[]
}
