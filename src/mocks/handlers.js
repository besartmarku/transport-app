import { getDistance } from 'geolib'
import uniqBy from 'lodash/uniqBy'
import { rest } from 'msw'
import similarity from 'string-similarity'
import cities from './cities.json'

export const handlers = [
  rest.get('/api/cities', (req, res, ctx) => {
    const query = (req.url.searchParams.get('q') ?? '').toLowerCase()
    if (query === 'fail') {
      return res(ctx.status(200), ctx.json([]), ctx.delay())
    }
    const data = uniqBy(
      cities.filter((city) => city.name.toLowerCase().includes(query)),
      'name'
    )
      .map((city) => ({
        ...city,
        score: similarity.compareTwoStrings(city.name, query),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    return res(ctx.status(200), ctx.json(data), ctx.delay(500))
  }),
  rest.get('/api/distance', (req, res, ctx) => {
    const ids = req.url.searchParams.getAll('cities')
    if (!ids?.length) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'BAD REQUEST' }),
        ctx.delay()
      )
    }
    const result = ids.map((id) => cities.find((c) => +c.id === +id))
    if (result.some((city) => city.name.toLowerCase() === 'dijon')) {
      return res(
        ctx.status(500),
        ctx.json({ message: 'Unknown error' }),
        ctx.delay(500)
      )
    }
    const distances = result
      .map((city, i) => {
        if (i === result.length - 1) return undefined
        return (
          getDistance(
            { lat: city.gps_lat, lng: city.gps_lng },
            { lat: result?.[i + 1].gps_lat, lng: result?.[i + 1].gps_lng }
          ) / 1000
        ).toFixed(2)
      })
      .filter(Boolean)
    const total = distances.reduce((sum, acc) => sum + +acc, 0).toFixed(2)

    return res(ctx.status(200), ctx.json({ distances, total }), ctx.delay(700))
  }),
]
