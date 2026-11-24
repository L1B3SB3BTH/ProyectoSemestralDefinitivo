// Átomo Input: campo controlado (recibe el valor y avisa cuando cambia)
type Props = {
  tipo: string
  nombre: string
  valor: string // valor actual del campo
  alCambiar: (valor: string) => void // función que actualiza el estado
  maxLength?: number
  filas?: number // si se indica, se muestra un textarea
  error?: string
}

export function Input({ tipo, nombre, valor, alCambiar, maxLength, filas, error }: Props) {
  if (filas) {
    return (
      // Si hay filas se usa textarea, por ejemplo para el mensaje de contacto.
      <textarea
        id={nombre}
        name={nombre}
        rows={filas}
        className="form-control"
        maxLength={maxLength}
        value={valor}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${nombre}-error` : undefined}
        onChange={(e) => alCambiar(e.target.value)}
      />
    )
  }

  return (
    // aria-invalid y aria-describedby conectan el campo con su mensaje de error.
    <input
      id={nombre}
      type={tipo}
      name={nombre}
      className="form-control"
      maxLength={maxLength}
      value={valor}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${nombre}-error` : undefined}
      onChange={(e) => alCambiar(e.target.value)}
    />
  )
}
