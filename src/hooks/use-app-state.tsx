import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import z from 'zod'

type IState = {
  cities: Array<{ name: string; id: number } | undefined>
  passengers: number
  date: Date
}
type IAction =
  | { type: 'increment-passengers' }
  | { type: 'change-date'; date: Date }
  | { type: 'decrement-passengers' }
  | { type: 'add-destination' }
  | { type: 'remove-destination'; index: number }
  | {
      type: 'change-destination'
      index: number
      city?: { name: string; id: number }
    }

function reducer(state: IState, action: IAction): IState {
  const newCities = [...state.cities]

  switch (action.type) {
    case 'change-date':
      return { ...state, date: action.date }
    case 'add-destination':
      return { ...state, cities: [...newCities, undefined] }

    case 'remove-destination':
      newCities.splice(action.index, 1)
      return { ...state, cities: newCities }

    case 'change-destination':
      newCities.splice(action.index, 1, action.city)
      return { ...state, cities: newCities }

    case 'increment-passengers':
      return { ...state, passengers: state.passengers + 1 }

    case 'decrement-passengers':
      return { ...state, passengers: Math.max(0, state.passengers - 1) }
  }
}
function validateState(state: object) {
  return z
    .object({
      cities: z.array(
        z.object({ name: z.string(), id: z.number() }).optional().nullable()
      ),
      passengers: z.number().optional().nullable(),
      date: z.string().datetime().nullable().optional(),
    })
    .parse(state)
}
function useAppState() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('state')
  const state: IState = useMemo(() => {
    try {
      const st = JSON.parse(search ?? '')
      validateState(st)
      return st
    } catch (error) {
      console.log(error)
      return { cities: [undefined, undefined], passengers: 1, date: new Date() }
    }
  }, [search])
  state.date = new Date(state.date ?? new Date())

  const dispatch = (action: IAction) => {
    const params = JSON.stringify(reducer(state, action))
    setSearchParams(new URLSearchParams({ state: params }))
  }

  return [state, dispatch] as const
}

export { useAppState }
