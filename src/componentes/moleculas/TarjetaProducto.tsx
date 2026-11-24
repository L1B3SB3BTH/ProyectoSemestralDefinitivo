import { Boton } from '../atomos/Boton'
import { BotonLink } from '../atomos/BotonLink'
import { formatearPrecio } from '../../utilidades'

type ProductCardProps = {
  product: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }
  onAdd: (id: number) => void
}

export function TarjetaProducto({ product, onAdd }: ProductCardProps) {
  return (
    <article className="card h-100">
      <img src={product.imagen} alt={product.nombre} />
      <div className="card-body d-flex flex-column">
        <h3>{product.nombre}</h3>
        <p>{product.descripcion}</p>
        <strong className="mb-3">{formatearPrecio(product.precio)}</strong>

        <div
          className="d-flex flex-column align-items-center gap-2 mt-auto mx-auto w-100"
          style={{ maxWidth: '210px' }}
        >
          <BotonLink
            to={`/productos/${product.id}`}
            className="w-100 rounded-pill py-2 fw-semibold text-center"
          >
            Ver detalle
          </BotonLink>
          <Boton
            onClick={() => onAdd(product.id)}
            className="w-100 py-2"
          >
            Agregar al carrito
          </Boton>
        </div>
      </div>
    </article>
  )
}