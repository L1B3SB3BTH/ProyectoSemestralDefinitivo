import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'danger'
}

export function Boton({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const classes = [variant === 'danger' ? 'danger' : '', className].filter(Boolean).join(' ')

  return <button className={classes || undefined} {...props}>{children}</button>
}
