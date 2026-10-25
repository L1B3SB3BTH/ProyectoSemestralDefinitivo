import { TarjetaNovedad } from '../moleculas/TarjetaNoverdad'

type Props = { novedades: { id: string; title: string; image: string; summary: string; paragraphs: string[]; tips?: string[] }[] }

export function ListaNovedades({ novedades }: Props) {
  return (
    <section className="content-section">
      <h2>Novedades</h2>
      <div className="news-grid">
        {novedades.map((item) => <TarjetaNovedad key={item.id} item={item} />)}
      </div>
    </section>
  )
}
