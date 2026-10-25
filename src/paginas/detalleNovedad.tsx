import { useParams } from 'react-router-dom'
import { ArticuloNovedad } from '../componentes/organismos/ArticuloNovedad'

type Props = { novedades: { id: string; title: string; image: string; summary: string; paragraphs: string[]; tips?: string[] }[] }

export function DetalleNovedad({ novedades }: Props) {
  const { id } = useParams()
  const item = novedades.find((novedad) => novedad.id === id)

  if (!item) {
    return (
      <main className="page">
        <p>Novedad no encontrada.</p>
      </main>
    )
  }

  return (
    <main className="page">
      <ArticuloNovedad item={item} />
    </main>
  )
}
