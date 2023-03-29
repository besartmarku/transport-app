function Arrow({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.8706 5.15272L5.86457 0.146738C5.76966 0.0527353 5.64148 0 5.5079 0C5.37431 0 5.24613 0.0527353 5.15122 0.146738L0.145239 5.15272C0.0773278 5.2251 0.031297 5.31523 0.0124716 5.41268C-0.0063537 5.51013 0.00279571 5.61092 0.0388615 5.70338C0.0771581 5.79449 0.141567 5.87223 0.22397 5.92679C0.306374 5.98136 0.403084 6.01031 0.501915 6.01H10.5139C10.6127 6.01031 10.7094 5.98136 10.7918 5.92679C10.8742 5.87223 10.9386 5.79449 10.9769 5.70338C11.013 5.61092 11.0221 5.51013 11.0033 5.41268C10.9845 5.31523 10.9385 5.2251 10.8706 5.15272Z"
        fill="#C7D1F4"
      />
    </svg>
  )
}

export { Arrow }