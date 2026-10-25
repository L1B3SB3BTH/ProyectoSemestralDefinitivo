import { Boton } from '../atomos/Boton'
import { BotonLink } from '../atomos/BotonLink'

type Props = {
  product: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }
  onAdd: (id: number) => void
}

export function ArticuloProducto({ product, onAdd }: Props) {
  return (
    <article className="content-card detail">
      <h2>Detalle del producto</h2>
      <img src={product.imagen} alt={product.nombre} style={{ maxWidth: '20rem' }} />
      <h3>{product.nombre}</h3>
      <p>{product.descripcion}</p>
      <p><strong>${product.precio.toLocaleString('es-CL')}</strong></p>
      <div className="d-flex flex-wrap gap-2">
        <BotonLink to="/productos" variante="secondary">Volver a Productos</BotonLink>
        <Boton onClick={() => onAdd(product.id)}>Agregar a selección</Boton>
      </div>
    </article>
  )
}
