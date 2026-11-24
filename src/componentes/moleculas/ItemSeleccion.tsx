import { Boton } from '../atomos/Boton'
import { formatearPrecio } from '../../utilidades'

type SelectionItemProps = {
  product: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }
  quantity: number
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export function ItemSeleccion({ product, quantity, onAdd, onRemove }: SelectionItemProps) {
  return (
    <div className="selection-item">
      <img src={product.imagen} alt={product.nombre} />
      <div>
        <h3>{product.nombre}</h3>
        <p>{formatearPrecio(product.precio)} por unidad</p>
      </div>
      {/* Los botones modifican solo una unidad y exponen nombres accesibles. */}
      <div className="quantity-control" aria-label={`Cantidad de ${product.nombre}`}>
        <Boton type="button" className="quantity-button" aria-label={`Quitar una unidad de ${product.nombre}`} onClick={() => onRemove(product.id)}>−</Boton>
        <output aria-label="Cantidad">{quantity}</output>
        <Boton type="button" className="quantity-button" aria-label={`Agregar una unidad de ${product.nombre}`} onClick={() => onAdd(product.id)}>+</Boton>
      </div>
      <strong className="item-total">{formatearPrecio(product.precio * quantity)}</strong>
    </div>
  )
}
