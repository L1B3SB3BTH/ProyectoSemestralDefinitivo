import { SeleccionProductos } from '../componentes/organismos/SeleccionProductos'

type SeleccionProps = {
  productos: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }[]
  selection: number[]
  onAdd: (id: number) => void
  onRemove: (id: number) => void
  onCheckout: () => void
}

export function Seleccion({ productos, selection, onAdd, onRemove, onCheckout }: SeleccionProps) {
  return (
    <main className="page">
      <SeleccionProductos productos={productos} selection={selection} onAdd={onAdd} onRemove={onRemove} onCheckout={onCheckout} />
    </main>
  )
}
