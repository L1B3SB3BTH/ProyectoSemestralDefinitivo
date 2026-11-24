import { useParams } from 'react-router-dom'
import { BotonLink } from '../componentes/atomos/BotonLink'
import { ArticuloProducto } from '../componentes/organismos/ArticuloProducto'

type Props = {
  productos: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }[]
  onAdd: (id: number) => void
}

export function DetalleProducto({ productos, onAdd }: Props) {
  const { id } = useParams()
  const product = productos.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <main className="page container text-center my-5">
        <p className="fs-4 mb-3">Producto no encontrado.</p>
        <BotonLink to="/productos" variante="secondary" className="rounded-pill px-4 py-2">
          ← Volver a Productos
        </BotonLink>
      </main>
    )
  }

  return (
    <main className="page">
      <ArticuloProducto product={product} onAdd={onAdd} />
    </main>
  )
}