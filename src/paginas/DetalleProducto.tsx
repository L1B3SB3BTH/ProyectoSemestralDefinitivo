import { useParams } from 'react-router-dom'
import { BotonLink } from '../componentes/atomos/BotonLink'
import { ArticuloProducto } from '../componentes/organismos/ArticuloProducto'

type Props = {
  productos: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }[]
  onAdd: (id: number) => void
}

export function DetalleProducto({ productos, onAdd }: Props) {
  // Obtenemos el id que viene en la URL
  const { id } = useParams()

  // Buscamos el producto que corresponde al id recibido
  const product = productos.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <main className="page">
        <p>Producto no encontrado.</p>
        <BotonLink to="/productos" variante="secondary">Volver a Productos</BotonLink>
      </main>
    )
  }

  return (
    <main className="page">
      <ArticuloProducto product={product} onAdd={onAdd} />
    </main>
  )
}
