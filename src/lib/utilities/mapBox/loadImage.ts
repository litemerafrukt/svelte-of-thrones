import type { Map } from 'mapbox-gl'

export const loadImage = async (map: Map, url: string) =>
  new Promise<HTMLImageElement | ImageBitmap>((resolve, reject) => {
    map.loadImage(url, (error, image) => {
      if (error) {
        return reject(error)
      }

      if (image === undefined) {
        return reject(new Error('No marker image'))
      }

      return resolve(image)
    })
  })

export const addImageByUrl = async (map: Map, id: string, url: string) => {
  const image = await loadImage(map, url)

  map.addImage(id, image)
}
