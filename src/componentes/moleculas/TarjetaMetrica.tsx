type Props = {
  titulo: string
  valor: string | number
  subtitulo?: string
  colorBorde?: 'primary' | 'success' | 'warning'
}

export function TarjetaMetrica({ titulo, valor, subtitulo, colorBorde = 'primary' }: Props) {
  return (
    <div className={`card border-0 border-start border-4 border-${colorBorde} shadow-sm rounded-4 p-3 h-100 bg-white`}>
      <span className="text-uppercase text-muted fw-semibold small mb-1">{titulo}</span>
      <strong className="fs-2 fw-bold" style={{ color: '#0a1f44' }}>
        {valor}
      </strong>
      {subtitulo && <span className="text-secondary small mt-1">{subtitulo}</span>}
    </div>
  )
}