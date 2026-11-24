import { Link } from 'react-router-dom'
import { EnlaceNav } from '../atomos/EnlaceNav'

type SiteHeaderProps = { selectionCount: number }

export function Navbar({ selectionCount }: SiteHeaderProps) {
  // El contador refleja unidades totales, también cuando se repite un producto.
  const links = [
    { label: 'Inicio', to: '/', end: true },
    { label: 'Productos', to: '/productos' },
    { label: 'Nosotros', to: '/nosotros' },
    { label: 'Novedades', to: '/novedades' },
    { label: `Carrito (${selectionCount})`, to: '/seleccion' },
    { label: 'Contacto', to: '/contacto' },
    { label: 'Registrarse', to: '/registro' },
    { label: 'Login', to: '/login' },
  ]

  return (
    <header>
      <h1>Tienda Sonido Vivo</h1>
      <nav>
        <Link className="brand" to="/">Tienda Sonido Vivo</Link>
        <div className="nav-links">
          {links.map((link) => <EnlaceNav key={link.to} to={link.to} end={link.end}>{link.label}</EnlaceNav>)}
        </div>
      </nav>
    </header>
  )
}
