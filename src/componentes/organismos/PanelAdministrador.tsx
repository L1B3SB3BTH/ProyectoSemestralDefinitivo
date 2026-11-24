import { useState, type FormEvent } from 'react'
import { Boton } from '../atomos/Boton'
import { TarjetaMetrica } from '../moleculas/TarjetaMetrica'
import { formatearPrecio } from '../../utilidades'

type Producto = {
  id: number
  nombre: string
  precio: number
  imagen: string
  descripcion: string
}

type Consulta = {
  nombre: string
  correo: string
  mensaje: string
  fecha: string
}

type Props = {
  productos: Producto[]
  onAgregarProducto?: (nuevo: Omit<Producto, 'id'>) => void
  onEliminarProducto?: (id: number) => void
}

export function PanelAdministrador({ productos, onAgregarProducto, onEliminarProducto }: Props) {
  // Estado local de respaldo por si aún no pasas handlers desde App.tsx
  const [listaLocal, setListaLocal] = useState<Producto[]>(productos)
  const items = onAgregarProducto ? productos : listaLocal

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagen, setImagen] = useState('/img/audifonos.jpg')

  const [consultas, setConsultas] = useState<Consulta[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sonidoVivoConsultas') || '[]') as Consulta[]
    } catch {
      return []
    }
  })

  const manejarCrear = (e: FormEvent) => {
    e.preventDefault()
    if (!nombre.trim() || !precio || Number(precio) <= 0) {
      alert('Ingresa un nombre y un precio válido.')
      return
    }

    const nuevo = {
      nombre: nombre.trim(),
      precio: Number(precio),
      imagen: imagen.trim() || '/img/audifonos.jpg',
      descripcion: descripcion.trim() || 'Equipo de audio de alta fidelidad.'
    }

    if (onAgregarProducto) {
      onAgregarProducto(nuevo)
    } else {
      setListaLocal([{ id: Date.now(), ...nuevo }, ...listaLocal])
    }

    setNombre('')
    setPrecio('')
    setDescripcion('')
  }

  const manejarEliminar = (id: number) => {
    if (onEliminarProducto) {
      onEliminarProducto(id)
    } else {
      setListaLocal(listaLocal.filter((p) => p.id !== id))
    }
  }

  const eliminarConsulta = (fecha: string) => {
    const filtradas = consultas.filter((c) => c.fecha !== fecha)
    setConsultas(filtradas)
    localStorage.setItem('sonidoVivoConsultas', JSON.stringify(filtradas))
  }

  return (
    <section className="container my-4">
      {/* Cabecera */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <div>
          <span className="text-uppercase text-primary fw-semibold small d-block">
            Panel de Control
          </span>
          <h1 className="fw-bold mb-0" style={{ color: '#0a1f44' }}>
            Administración de Tienda
          </h1>
        </div>
        <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2">
          ● Sesión Administrador Activa
        </span>
      </div>

      {/* 1. Métricas (KPIs) */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <TarjetaMetrica
            titulo="Productos en catálogo"
            valor={items.length}
            subtitulo="Disponibles en tienda"
            colorBorde="primary"
          />
        </div>
        <div className="col-12 col-md-4">
          <TarjetaMetrica
            titulo="Consultas de clientes"
            valor={consultas.length}
            subtitulo="Guardadas en este dispositivo"
            colorBorde="warning"
          />
        </div>
        <div className="col-12 col-md-4">
          <TarjetaMetrica
            titulo="Valor total inventario"
            valor={formatearPrecio(items.reduce((acc, p) => acc + p.precio, 0))}
            subtitulo="Suma de catálogo activo"
            colorBorde="success"
          />
        </div>
      </div>

      {/* 2. Formulario rápido + Tabla de productos */}
      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h2 className="h5 fw-bold mb-3" style={{ color: '#0a1f44' }}>
              Agregar producto
            </h2>
            <form onSubmit={manejarCrear} className="d-flex flex-column gap-3">
              <div>
                <label className="form-label fw-semibold small">Nombre del equipo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej. Parlante Studio Pro"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label fw-semibold small">Precio (CLP)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej. 49990"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label fw-semibold small">Ruta de imagen</label>
                <input
                  type="text"
                  className="form-control"
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label fw-semibold small">Descripción breve</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Características principales..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <Boton type="submit" className="w-100 py-2 fw-semibold">
                + Agregar al catálogo
              </Boton>
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
            <h2 className="h5 fw-bold mb-3" style={{ color: '#0a1f44' }}>
              Inventario de Productos ({items.length})
            </h2>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th className="text-end">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((prod) => (
                    <tr key={prod.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={prod.imagen}
                            alt={prod.nombre}
                            className="rounded-2 border"
                            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                          />
                          <div>
                            <strong className="d-block">{prod.nombre}</strong>
                            <span className="text-muted small">{prod.descripcion}</span>
                          </div>
                        </div>
                      </td>
                      <td className="fw-semibold">{formatearPrecio(prod.precio)}</td>
                      <td className="text-end">
                        <Boton
                          variant="danger"
                          onClick={() => manejarEliminar(prod.id)}
                          className="px-3 py-1 small"
                        >
                          Eliminar
                        </Boton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Bandeja de consultas */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h2 className="h5 fw-bold mb-3" style={{ color: '#0a1f44' }}>
              Consultas Recibidas ({consultas.length})
            </h2>
            {consultas.length === 0 ? (
              <p className="text-muted mb-0">No hay consultas pendientes en este dispositivo.</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {consultas.map((c) => (
                  <div
                    key={c.fecha}
                    className="p-3 rounded-3 bg-light border d-flex justify-content-between align-items-start gap-3"
                  >
                    <div>
                      <strong>{c.nombre}</strong>{' '}
                      <span className="text-muted small">({c.correo})</span>
                      <p className="mb-1 mt-1 small">{c.mensaje}</p>
                      <time className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {new Date(c.fecha).toLocaleString('es-CL')}
                      </time>
                    </div>
                    <Boton
                      variant="danger"
                      onClick={() => eliminarConsulta(c.fecha)}
                      className="px-3 py-1 small"
                    >
                      Archivar
                    </Boton>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}