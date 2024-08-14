import clsx from 'clsx'

import type { Size } from '~/types'

export interface ButtonProps extends React.ComponentProps<'button'> {
  size?: Size
  loading?: boolean
  active?: boolean
}

const getDerivedSize: Record<Size, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-4 py-2',
  xl: 'px-6 py-3',
}

export const Button: React.FC<ButtonProps> = ({
  size = 'md',
  type = 'button',
  onClick,
  disabled,
  loading,
  active,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      className={clsx(
        'flex items-center justify-center gap-2 rounded-md border border-indigo-500 font-medium shadow-sm transition-colors',
        active ? 'bg-indigo-700' : 'hover:bg-indigo-400 hover:text-indigo-900',
        getDerivedSize[size],
        (disabled || loading) && 'pointer-events-none opacity-60',
        className,
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {children}
    </button>
  )
}
