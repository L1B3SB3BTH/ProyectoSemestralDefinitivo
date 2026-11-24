import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PanelAdministrador } from '../componentes/organismos/PanelAdministrador'
import { Boton } from '../componentes/atomos/Boton'
import { cerrarSesion, obtenerSesion } from '../utilidades'

type Props = {
  productos: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }[]
  onAgregarProducto?: (nuevo: { nombre: string; precio: number; imagen: string; descripcion: string }) => void
  onEliminarProducto?: (id: number) => void
}

export function Admin({ productos, onAgregarProducto, onEliminarProducto }: Props) {
  const navigate = useNavigate()
  const sesion = obtenerSesion()

  useEffect(() => {
    if (!sesion || sesion.rol !== 'ADMINISTRADOR') {
      navigate('/login')
    }
  }, [sesion, navigate])

  if (!sesion || sesion.rol !== 'ADMINISTRADOR') return null

  const manejarCerrarSesion = () => {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <main className="page">
      <div className="container pt-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <span className="text-muted small">
          Conectado como: <strong>{sesion.nombre}</strong> ({sesion.correo})
        </span>
        <Boton variant="danger" onClick={manejarCerrarSesion} className="px-3 py-1 small">
          Cerrar sesión
        </Boton>
      </div>

      <PanelAdministrador
        productos={productos}
        onAgregarProducto={onAgregarProducto}
        onEliminarProducto={onEliminarProducto}
      />
    </main>
  )
}