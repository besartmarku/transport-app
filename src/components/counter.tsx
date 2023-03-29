import classNames from 'classnames'
import { IconButton } from './icon-button'
import { minusIcon, plusIcon } from './icons'

type Props = {
  onIncrement(): void
  onDecrement(): void
  count: number
  error?: string
}

function Counter({ onIncrement, onDecrement, count, error }: Props) {
  return (
    <div>
      <div
        className={classNames(
          'grid w-[92px] grid-cols-[auto_1fr_auto] rounded border px-2.5 py-1.5',
          error ? 'border-red' : 'border-grey'
        )}
      >
        <IconButton disabled={!count} onClick={onDecrement}>
          {minusIcon}
        </IconButton>

        <span className="flex items-center justify-center text-center font-medium">
          {count}
        </span>

        <IconButton onClick={onIncrement}>{plusIcon}</IconButton>
      </div>
      <div className="h-4 font-medium text-red">{error}</div>
    </div>
  )
}

export { Counter }
