import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Link, useSearchParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import {
  Button,
  cityEndIcon,
  cityTimeLineSrc,
  distanceIcon,
} from '../components'
import { useAppState } from '../hooks/use-app-state'

function Results() {
  const [{ cities, passengers, date }] = useAppState()
  const [searchParams] = useSearchParams()
  const url = new URL('/api/distance', window.location.origin)
  for (const city of cities) {
    url.searchParams.append('cities', city?.id?.toString() ?? '')
  }
  const { data, isLoading, isError } = useQuery<{
    distances: Array<string>
    total: string
  }>({
    queryKey: ['cities', 'distance', cities],
    queryFn: () =>
      fetch(url).then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Oops!')
      }),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center ">
        <BeatLoader className="text-purple-dark" color="currentColor" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-between">
        <span className="flex flex-1 items-center font-bold text-purple-dark">
          Oops! Something went wrong!
        </span>
        <Link to={{ pathname: '/', search: searchParams.toString() }}>
          <Button>Back</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-2">
        {cities.filter(Boolean).map((city, i) => {
          const isLast = cities.length - 1 === i
          return (
            <div
              key={city?.id ?? ''}
              className="grid grid-cols-[1fr_auto_1fr] gap-x-4"
            >
              <div className="relative flex translate-y-3.5 translate-x-2 items-start justify-end">
                {!isLast && (
                  <div className="relative">
                    {distanceIcon}

                    <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-purple-dark">
                      {data?.distances[i]} km
                    </span>
                  </div>
                )}
              </div>
              {isLast ? (
                cityEndIcon
              ) : (
                <img src={cityTimeLineSrc} width="13" height="34" />
              )}

              <span className="font-medium">{city?.name}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-5 flex justify-center font-medium">
        <span className="font-bold text-purple-dark">{data?.total} km</span>
        &nbsp;is total distance
      </div>
      <div className="mt-2 flex justify-center font-medium">
        <span className="font-bold text-purple-dark">{passengers}</span>
        &nbsp;
        {passengers === 1 ? 'passenger' : 'passengers'}
      </div>
      <div className="mt-2 text-center font-bold text-purple-dark">
        {dayjs(date).format('MMM DD, YYYY')}
      </div>

      <div className="mt-9 flex justify-center">
        <Link
          className="w-full md:w-auto"
          to={{ pathname: '/', search: searchParams.toString() }}
        >
          <Button className="w-full">Back</Button>
        </Link>
      </div>
    </div>
  )
}

export { Results }
