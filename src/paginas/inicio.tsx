import { ListaNovedades } from '../componentes/organismos/ListaNovedades'
import { PresentacionTienda } from '../componentes/organismos/PresentacionTienda'
import { ProductosDestacados } from '../componentes/organismos/ProductosDestacados'

type InicioProps = {
  productos: { id: number; nombre: string; precio: number; imagen: string; descripcion: string }[]
  novedades: { id: string; title: string; image: string; summary: string; paragraphs: string[]; tips?: string[] }[]
  onAdd: (id: number) => void
}

export function Inicio({ productos, novedades, onAdd }: InicioProps) {
  return (
    <main className="page">
      <PresentacionTienda />
      <ProductosDestacados productos={productos} onAdd={onAdd} />
      <ListaNovedades novedades={novedades} />
    </main>
  )
}
