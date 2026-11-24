import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  to: string
  children: ReactNode
  variante?: 'primary' | 'secondary'
  className?: string
}

export function BotonLink({ to, children, variante = 'primary', className = '' }: Props) {
  return (
    <Link to={to} className={`btn btn-${variante} ${className}`.trim()}>
      {children}
    </Link>
  )
}