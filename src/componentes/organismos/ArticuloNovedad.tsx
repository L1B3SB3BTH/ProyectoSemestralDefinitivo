import { Link } from 'react-router-dom'

type Props = {
  item: {
    id: string
    title: string
    image: string
    summary: string
    paragraphs: string[]
    tips?: string[]
  }
}

export function ArticuloNovedad({ item }: Props) {
  return (
    <article
      className="content-card detail card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white mx-auto my-4"
      style={{ maxWidth: '820px' }}
    >
      {/* Cabecera editorial */}
      <div className="mb-4">
        <span className="text-uppercase text-primary fw-semibold small d-block mb-2">
          Novedades y Consejos
        </span>
        <h2 className="fw-bold display-6 mb-0" style={{ color: '#0a1f44' }}>
          {item.title}
        </h2>
      </div>

      {/* Imagen destacada centrada sobre fondo limpio */}
      <div className="text-center bg-light rounded-4 p-3 p-md-4 mb-4">
        <img
          src={item.image}
          alt={item.title}
          className="img-fluid rounded-3"
          style={{ maxHeight: '340px', objectFit: 'contain' }}
        />
      </div>

      {/* Párrafos de introducción */}
      <div className="text-secondary fs-5 lh-base mb-4">
        {item.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-3">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Lista de recomendaciones con buen aire */}
      {item.tips && (
        <div className="bg-light rounded-4 p-4 mb-4 border-start border-4 border-primary">
          <ol className="mb-0 ps-3 d-flex flex-column gap-2 fs-5" style={{ color: '#0a1f44' }}>
            {item.tips.map((tip) => (
              <li key={tip} className="ps-2">
                {tip}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Botón de regreso separado al pie */}
      <div className="pt-3 border-top">
        <Link className="outline-button d-inline-block" to="/novedades">
          ← Volver a Novedades
        </Link>
      </div>
    </article>
  )
}