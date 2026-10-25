import { ListaNovedades } from '../componentes/organismos/ListaNovedades'

type NovedadesProps = { novedades: { id: string; title: string; image: string; summary: string; paragraphs: string[]; tips?: string[] }[] }

export function Novedades({ novedades }: NovedadesProps) {
  return (
    <main className="page">
      <ListaNovedades novedades={novedades} />
    </main>
  )
}
