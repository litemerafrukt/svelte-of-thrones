import type { Map } from 'mapbox-gl'

/**
 * Remove source from map in a try catch.
 *
 * Seems Vites HMR sometimes causes
 * the style prop on map to go missing.
 */
export const removeSource = (map: Map, sourceId: string) => {
  try {
    map.removeSource(sourceId)
  } catch {
    /* intenionally left empty */
  }
}

/**
 * Remove layer from map in a try catch.
 *
 * Seems Vites HMR sometimes causes
 * the style prop on map to go missing.
 */
export const removeLayer = (map: Map, layerId: string) => {
  try {
    map.removeLayer(layerId)
  } catch {
    /* intenionally left empty */
  }
}
