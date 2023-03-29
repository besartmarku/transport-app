import classNames from 'classnames'

function Button({
  disabled,
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      className={classNames(
        ' h-[38px] rounded  border border-grey px-3 py-2 text-sm font-medium text-white transition-colors',
        !disabled ? 'bg-black' : 'bg-grey',
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  )
}

export { Button }
