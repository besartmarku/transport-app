import { Fragment, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, City, Counter, DatePicker } from '../components'
import { addIcon, cityEndIcon, cityIcon } from '../components/icons'
import { useAppState } from '../hooks/use-app-state'

function Home() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [{ cities, passengers, date }, dispatch] = useAppState()
  const [isValidated, setIsValidated] = useState(false)

  const isValid = cities.every((city) => !!city?.name) && !!passengers

  return (
    <>
      <div className="grid gap-x-20 gap-y-11 md:grid-cols-[auto_108px]">
        <div className="grid grid-cols-[auto_1fr] gap-x-12">
          {cities.map((city, i) => {
            const label = i ? 'destination' : 'origin'
            const isLast = i === cities.length - 1
            return (
              <Fragment key={city?.id ?? i}>
                <span className={'translate-y-[calc(50%-8px)]'}>
                  {isLast ? cityEndIcon : cityIcon}
                </span>
                <City
                  showDelete={cities.length > 2 && !!i}
                  onDelete={() =>
                    dispatch({ type: 'remove-destination', index: i })
                  }
                  label={`City of ${label}`}
                  selected={city ?? { name: '', id: 0 }}
                  onSelectedChange={(city) => {
                    dispatch({ type: 'change-destination', index: i, city })
                  }}
                  error={
                    isValidated && !city?.name
                      ? `You must choose the city of ${label}`
                      : undefined
                  }
                />
              </Fragment>
            )
          })}
          <div className="pt-2">{addIcon}</div>
          <div>
            <button
              onClick={() => dispatch({ type: 'add-destination' })}
              className="mt-2 font-medium text-purple-dark"
              data-testid="add-destination"
            >
              Add destination
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 pl-[60px] md:flex-col md:items-start md:space-x-0 md:space-y-5 md:pl-0">
          <div className="">
            <label className="mb-0.5 block w-[110px] font-medium">
              Passengers
            </label>
            <Counter
              error={
                isValidated && !passengers ? 'Select passengers' : undefined
              }
              count={passengers}
              onIncrement={() => dispatch({ type: 'increment-passengers' })}
              onDecrement={() => dispatch({ type: 'decrement-passengers' })}
            />
          </div>
          <div>
            <label className="mb-0.5 font-medium">Date</label>
            <DatePicker
              value={date}
              onChange={(date) => dispatch({ type: 'change-date', date })}
            />
            <div className="h-4" />
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <Button
          onClick={() => {
            setIsValidated(true)
            if (isValid)
              navigate({
                pathname: '/results',
                search: searchParams.toString(),
              })
          }}
          className="w-full md:w-auto"
          disabled={!isValid}
        >
          Submit
        </Button>
      </div>
    </>
  )
}

export { Home }
