import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  to: string
  children: ReactNode
  variante?: 'primary' | 'secondary'
}

// Átomo: botón de Bootstrap que navega con <Link> (sin recargar la página)
export function BotonLink({ to, children, variante = 'primary' }: Props) {
  return <Link to={to} className={`btn btn-${variante}`}>{children}</Link>
}
