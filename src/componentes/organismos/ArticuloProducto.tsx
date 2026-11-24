import { Boton } from '../atomos/Boton'
import { BotonLink } from '../atomos/BotonLink'
import { formatearPrecio } from '../../utilidades'

type Props = {
  product: {
    id: number
    nombre: string
    precio: number
    imagen: string
    descripcion: string
  }
  onAdd: (id: number) => void
}

export function ArticuloProducto({ product, onAdd }: Props) {
  return (
    <section className="container my-4">
      <div className="mb-4">
        <BotonLink
          to="/productos"
          variante="secondary"
          className="rounded-pill px-4 py-2"
        >
          ← Volver a Productos
        </BotonLink>
      </div>

      <article className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
        <div className="row align-items-center g-4 g-md-5">
          <div className="col-12 col-md-6 text-center">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="img-fluid rounded-3"
              style={{ maxHeight: '360px', objectFit: 'contain' }}
            />
          </div>

          <div className="col-12 col-md-6 d-flex flex-column">
            <span className="text-uppercase text-muted fw-semibold small mb-1">
              Detalle del producto
            </span>

            <h1 className="fw-bold mb-3" style={{ color: '#0a1f44' }}>
              {product.nombre}
            </h1>

            <p className="text-secondary fs-5 mb-4">
              {product.descripcion}
            </p>

            <div className="mb-4 pb-3 border-bottom">
              <span className="fs-2 fw-bold" style={{ color: '#0a1f44' }}>
                {formatearPrecio(product.precio)}
              </span>
            </div>

            <div>
              <Boton
                onClick={() => onAdd(product.id)}
                className="w-100 py-3 fs-5 fw-semibold"
                style={{ maxWidth: '300px' }}
              >
                Agregar a selección
              </Boton>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}