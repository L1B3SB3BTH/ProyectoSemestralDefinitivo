type TextFieldProps = {
  label: string
  name: string
  type?: string
  maxLength?: number
  rows?: number
}

export function CampoTexto({ label, name, type = 'text', maxLength, rows }: TextFieldProps) {
  return (
    <label>
      {label}
      {rows ? <textarea name={name} rows={rows} maxLength={maxLength} /> : <input name={name} type={type} maxLength={maxLength} />}
    </label>
  )
}
