export const kingdomBoundaryId = (gid: number): string => `kingdom-boundary-source-${gid}`

export type KingdomPolygon = {
  type: 'MultiPolygon'
  coordinates: GeoJSON.Position[][][]
  properties: { name: string; gid: number }
}

export type KingdomBoundary = GeoJSON.Feature & {
  properties: { name: string; gid: number }
}

export type KingdomSummary = {
  name: string
  summary: string
  url: string
}
