import { ItemSeleccion } from '../moleculas/ItemSeleccion'

type ProductSelectionProps = {
  productos: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }[]
  selection: number[]
  onRemove: (id: number) => void
}

export function SeleccionProductos({ productos, selection, onRemove }: ProductSelectionProps) {
  const selectedProducts = productos.filter((product) => selection.includes(product.id))
  const total = selectedProducts.reduce((sum, product) => sum + product.precio, 0)

  return (
    <section className="content-card selection">
      <h2>Mi selección</h2>
      <p>Estos son los productos que has ido agregando desde la página principal. Se guardan en tu navegador.</p>
      {selectedProducts.length === 0
        ? <p className="empty">Todavía no has agregado productos a tu selección.</p>
        : selectedProducts.map((product) => <ItemSeleccion key={product.id} product={product} onRemove={onRemove} />)}
      <div className="total"><span>Total:</span><strong>${total.toLocaleString('es-CL')}</strong></div>
    </section>
  )
}
