import { Fragment, useId, useRef, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useDebounce } from 'use-debounce'
import { Arrow } from './arrow'
import { clearIcon, deleteIcon } from './icons'

type ICity = {
  id: number
  department_code: string
  insee_code: string
  zip_code: string
  name: string
  slug: string
  gps_lat: number
  gps_lng: number
}
type Props = {
  label: string
  error?: string
  selected: { name: string; id: number }
  onSelectedChange(city?: { name: string; id: number }): void
  showDelete: boolean
  onDelete(): void
}
function City({
  label,
  error,
  selected,
  onSelectedChange,
  showDelete,
  onDelete,
}: Props) {
  const [query, setQuery] = useState(selected.name)
  const [debouncedQuery] = useDebounce(query, 150)
  const [isFocused, setIsFocused] = useState(false)

  const cities = useQuery<ICity[]>({
    queryKey: ['cities', debouncedQuery],
    queryFn: () =>
      fetch('/api/cities?q=' + debouncedQuery).then((res) => res.json()),
    refetchOnMount: false,
  })
  const ref = useRef<HTMLInputElement>(null)
  const id = useId()

  error =
    cities.data?.length === 0 && query && isFocused
      ? 'Oops! Failed to search with this keyword.'
      : error

  return (
    <Combobox
      value={selected}
      onChange={(city: { name: string; id: number }) => {
        onSelectedChange({
          name: city.name,
          id: city.id,
        })
      }}
    >
      <div className="relative mb-0.5 w-full">
        <label className="mb-0.5 font-medium" htmlFor={id}>
          {label}
        </label>
        <div className="grid grid-cols-[1fr_18px]  items-center gap-x-4 md:grid-cols-[324px_18px]">
          <div
            className={classNames(
              'relative h-8 w-full flex-1 overflow-hidden rounded-[6px] border transition-colors focus:outline-none',
              error ? 'border-red' : 'border-[#E5E7EB]',
              cities.data?.length === 0 && !selected?.name && 'text-red'
            )}
          >
            <Combobox.Input
              ref={ref}
              id={id}
              autoComplete={'off'}
              className="h-full w-full border-none py-2 px-2.5 font-medium outline-none"
              displayValue={(city: ICity) => city.name}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => {
                setIsFocused(true)
                setQuery('')
              }}
              onBlur={() => setIsFocused(false)}
            />
            {selected?.name && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-2"
                onClick={() => {
                  onSelectedChange(undefined)
                  setQuery('')
                  ref.current?.focus()
                }}
              >
                {clearIcon}
              </button>
            )}
          </div>
          {showDelete && <button onClick={onDelete}>{deleteIcon}</button>}
        </div>

        {(cities.isLoading || !!cities.data?.length) && (
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-50 mt-1 w-[324px] focus:outline-none">
              <Arrow className="ml-3.5 -mb-0.5" />
              <div className="max-h-60 overflow-auto rounded-md border border-purple-light bg-white p-1.5">
                {cities.isLoading || query !== debouncedQuery ? (
                  <div className="space-y-1.5">
                    {Array(7)
                      .fill({})
                      .map((k, i) => (
                        <div
                          key={i}
                          className="h-5 w-[190px] animate-pulse rounded bg-grey"
                        />
                      ))}
                  </div>
                ) : (
                  cities.data?.map((city) => (
                    <Combobox.Option
                      key={city.id}
                      className={({ active }) =>
                        classNames(
                          'relative cursor-pointer select-none rounded-[6px] p-1.5 font-medium',
                          active && 'bg-purple-light'
                        )
                      }
                      value={city}
                    >
                      <span className={`block truncate `}>{city.name}</span>
                    </Combobox.Option>
                  ))
                )}
              </div>
            </Combobox.Options>
          </Transition>
        )}

        <div className="h-4 font-medium text-red">{error}</div>
      </div>
    </Combobox>
  )
}

export { City }
