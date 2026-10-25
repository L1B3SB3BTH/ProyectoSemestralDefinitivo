import { SeleccionProductos } from '../componentes/organismos/SeleccionProductos'

type SeleccionProps = {
  productos: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }[]
  selection: number[]
  onRemove: (id: number) => void
}

export function Seleccion({ productos, selection, onRemove }: SeleccionProps) {
  return (
    <main className="page">
      <SeleccionProductos productos={productos} selection={selection} onRemove={onRemove} />
    </main>
  )
}
