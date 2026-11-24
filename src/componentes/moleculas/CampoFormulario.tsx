import { Input } from '../atomos/Input'

type Props = {
  etiqueta: string
  tipo: string
  nombre: string
  valor: string
  alCambiar: (valor: string) => void
  maxLength?: number
  filas?: number
  error?: string
}

// Combina etiqueta, campo reutilizable y mensaje de validación asociado.
export function CampoFormulario({ etiqueta, tipo, nombre, valor, alCambiar, maxLength, filas, error }: Props) {
  return (
    <div className="field-group mb-3">
      <label className="form-label" htmlFor={nombre}>{etiqueta}</label>
      <Input tipo={tipo} nombre={nombre} valor={valor} alCambiar={alCambiar} maxLength={maxLength} filas={filas} error={error} />
      {error && <span className="field-error" id={`${nombre}-error`}>{error}</span>}
    </div>
  )
}
