import type { JSX } from 'solid-js'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: JSX.Element
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  href?: string
  class?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-300 active:bg-accent-500',
  secondary: 'bg-primary-500 text-white hover:bg-primary-400 active:bg-primary-600',
  danger: 'bg-danger-400 text-white hover:bg-danger-600 active:bg-danger-400',
  ghost: 'bg-transparent text-primary-300 hover:bg-bg-200 active:bg-bg-300',
  link: 'bg-transparent text-accent underline hover:text-accent-300 active:text-accent-500 px-0',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button(props: ButtonProps) {
  const variant = () => props.variant ?? 'primary'
  const size = () => props.size ?? 'md'

  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2 focus:ring-offset-bg-400 disabled:opacity-50 disabled:cursor-not-allowed'

  const classes = () =>
    `${baseStyles} ${variantStyles[variant()]} ${sizeStyles[size()]} ${props.fullWidth ? 'w-full' : ''} ${props.class ?? ''}`

  if (props.href) {
    return (
      <a href={props.href} class={classes()}>
        {props.children}
      </a>
    )
  }

  return (
    <button
      class={classes()}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
