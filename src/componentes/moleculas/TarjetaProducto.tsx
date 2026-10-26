import { Boton } from '../atomos/Boton'
import { BotonLink } from '../atomos/BotonLink'
import { formatearPrecio } from '../../utilidades'

// Props: los datos que recibe la tarjeta (mismo componente para todos los productos)
type ProductCardProps = {
  product: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }
  onAdd: (id: number) => void
}

export function TarjetaProducto({ product, onAdd }: ProductCardProps) {
  return (
    <article className="card">
      <img src={product.imagen} alt={product.nombre} />
      <div className="card-body">
        <h3>{product.nombre}</h3>
        <p>{product.descripcion}</p>
        <strong>{formatearPrecio(product.precio)}</strong>
        <div className="d-flex flex-wrap gap-2 mt-auto">
          <BotonLink to={`/productos/${product.id}`}>Ver detalle</BotonLink>
          <Boton onClick={() => onAdd(product.id)}>Agregar a selección</Boton>
        </div>
      </div>
    </article>
  )
}
