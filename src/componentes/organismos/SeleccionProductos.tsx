import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Boton } from '../atomos/Boton'
import { ItemSeleccion } from '../moleculas/ItemSeleccion'
import { formatearPrecio } from '../../utilidades'

type ProductSelectionProps = {
  productos: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }[]
  selection: number[]
  onAdd: (id: number) => void
  onRemove: (id: number) => void
  onCheckout: () => void
}

export function SeleccionProductos({ productos, selection, onAdd, onRemove, onCheckout }: ProductSelectionProps) {
  const [message, setMessage] = useState('')
  // Agrupa IDs repetidos del carrito para mostrar una fila por producto y su cantidad.
  const selectedProducts = productos
    .map((product) => ({ product, quantity: selection.filter((id) => id === product.id).length }))
    .filter(({ quantity }) => quantity > 0)
  // El total considera tanto el precio unitario como la cantidad elegida.
  const total = selectedProducts.reduce((sum, { product, quantity }) => sum + product.precio * quantity, 0)

  return (
    <section className="content-card selection">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">TU COMPRA</p>
          <h2>Carrito</h2>
        </div>
        <Link className="outline-button" to="/productos">Seguir comprando</Link>
      </div>
      {selectedProducts.length === 0
        ? <p className="empty">Tu carrito está vacío. Explora el catálogo y agrega tus productos favoritos.</p>
        : selectedProducts.map(({ product, quantity }) => (
          <ItemSeleccion key={product.id} product={product} quantity={quantity} onAdd={onAdd} onRemove={onRemove} />
        ))}
      <div className="total"><span>Total de la compra</span><strong>{formatearPrecio(total)}</strong></div>
      <p className="cart-note">El carrito se guarda en este dispositivo.</p>
      {selectedProducts.length > 0 && (
        <div className="checkout-action">
          <p className="checkout-note">Pago de demostración: no se realizará ningún cobro.</p>
          <Boton type="button" onClick={() => {
            setMessage('Compra de demostración completada. No se realizó ningún cobro.')
            onCheckout()
          }}>
            Pagar {formatearPrecio(total)}
          </Boton>
        </div>
      )}
      {message && <p className="form-message" role="status" aria-live="polite">{message}</p>}
    </section>
  )
}
