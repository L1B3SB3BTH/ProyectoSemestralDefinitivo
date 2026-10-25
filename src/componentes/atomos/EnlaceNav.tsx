import { NavLink } from 'react-router-dom'

type NavItemProps = {
  to: string
  children: string
  end?: boolean
}

export function EnlaceNav({ to, children, end = false }: NavItemProps) {
  return <NavLink to={to} end={end}>{children}</NavLink>
}
