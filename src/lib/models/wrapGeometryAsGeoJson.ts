import { KingdomBoundary, KingdomPolygon } from './kingdoms'

export const wrapGeometryAsGeoJson = (geometry: KingdomPolygon): KingdomBoundary => ({
  type: 'Feature',
  geometry,
  properties: geometry.properties
})
