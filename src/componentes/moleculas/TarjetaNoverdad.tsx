import { Link } from 'react-router-dom'

export function TarjetaNovedad({ item }: { item: { id: string; title: string; image: string; summary: string; paragraphs: string[]; tips?: string[] } }) {
  return (
    <article className="news-card">
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <Link className="outline-button" to={`/novedades/${item.id}`}>Leer más</Link>
      </div>
    </article>
  )
}
