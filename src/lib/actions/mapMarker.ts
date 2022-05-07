import mapboxgl from 'mapbox-gl'
import { getContext } from 'svelte'

type MapMarkerProps = {
  coordinates: mapboxgl.LngLatLike
}

export function mapMarker(element: HTMLElement, { coordinates }: MapMarkerProps) {
  const { getMap } = getContext<{ getMap: () => mapboxgl.Map }>('mapbox-gl')
  const map = getMap()
  const marker = new mapboxgl.Marker(element).setLngLat(coordinates).addTo(map)

  return {
    update({ coordinates }: MapMarkerProps) {
      marker.setLngLat(coordinates)
    },
    destroy() {
      marker.remove()
    }
  }
}
