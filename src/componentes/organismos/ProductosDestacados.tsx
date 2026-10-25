import { TarjetaProducto } from '../moleculas/TarjetaProducto'

type FeaturedProductsProps = {
  productos: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }[]
  onAdd: (id: number) => void
}

export function ProductosDestacados({ productos, onAdd }: FeaturedProductsProps) {
  return (
    <section className="productos">
      <h2>Productos destacados</h2>
      <div className="product-grid">
        {productos.map((product) => <TarjetaProducto key={product.id} product={product} onAdd={onAdd} />)}
      </div>
    </section>
  )
}
