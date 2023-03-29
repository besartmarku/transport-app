import classNames from 'classnames'

function IconButton(props: React.ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={classNames(
        'flex h-[22px] w-[22px] items-center justify-center rounded bg-purple-light transition-colors hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-purple-light',
        props.className
      )}
    >
      {props.children}
    </button>
  )
}

export { IconButton }
