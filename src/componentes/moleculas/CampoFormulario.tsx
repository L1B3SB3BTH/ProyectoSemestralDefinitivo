import { Input } from '../atomos/Input'

type Props = {
  etiqueta: string
  tipo: string
  nombre: string
  valor: string
  alCambiar: (valor: string) => void
  maxLength?: number
  filas?: number
}

// Molécula: etiqueta + Input
export function CampoFormulario({ etiqueta, tipo, nombre, valor, alCambiar, maxLength, filas }: Props) {
  return (
    <div className="mb-3">
      <label className="form-label">
        {etiqueta}
        <Input tipo={tipo} nombre={nombre} valor={valor} alCambiar={alCambiar} maxLength={maxLength} filas={filas} />
      </label>
    </div>
  )
}
