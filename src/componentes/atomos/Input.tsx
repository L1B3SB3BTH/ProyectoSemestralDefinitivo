// Átomo Input: campo controlado (recibe el valor y avisa cuando cambia)
type Props = {
  tipo: string
  nombre: string
  valor: string // valor actual del campo
  alCambiar: (valor: string) => void // función que actualiza el estado
  maxLength?: number
  filas?: number // si se indica, se muestra un textarea
}

export function Input({ tipo, nombre, valor, alCambiar, maxLength, filas }: Props) {
  if (filas) {
    return (
      <textarea
        name={nombre}
        rows={filas}
        className="form-control"
        maxLength={maxLength}
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
      />
    )
  }

  return (
    <input
      type={tipo}
      name={nombre}
      className="form-control"
      maxLength={maxLength}
      value={valor}
      onChange={(e) => alCambiar(e.target.value)}
    />
  )
}
