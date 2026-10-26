import { Boton } from '../atomos/Boton'
import { formatearPrecio } from '../../utilidades'

type SelectionItemProps = {
  product: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }
  onRemove: (id: number) => void
}

export function ItemSeleccion({ product, onRemove }: SelectionItemProps) {
  return (
    <div className="selection-item">
      <img src={product.imagen} alt={product.nombre} />
      <div>
        <h3>{product.nombre}</h3>
        <strong>{formatearPrecio(product.precio)}</strong>
      </div>
      <Boton variant="danger" onClick={() => onRemove(product.id)}>Quitar</Boton>
    </div>
  )
}
