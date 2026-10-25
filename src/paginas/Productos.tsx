import { ProductosDestacados } from '../componentes/organismos/ProductosDestacados'

type ProductosProps = {
  productos: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }[]
  onAdd: (id: number) => void
}

export function Productos({ productos, onAdd }: ProductosProps) {
  return (
    <main className="page">
      <ProductosDestacados productos={productos} onAdd={onAdd} />
    </main>
  )
}
