export const locationPointTypes = [
  'castle',
  'city',
  'town',
  'ruin',
  'region',
  'landmark'
] as const

export const locationId = (gid: number) => `location-source-${gid}`

export type LocationPointType = typeof locationPointTypes[number]

export type LocationPoint = {
  type: GeoJSON.Point
  coordinates: GeoJSON.Position
  properties: { name: string; type: string; gid: number }
}

export type Location = GeoJSON.Feature<GeoJSON.Point> & {
  properties: { name: string; type: string; gid: number }
}

export type LocationCollection = {
  type: LocationPointType
  locations: Location[]
}[]

export type LocationSummary = {
  name: string
  summary: string
  url: string
}
