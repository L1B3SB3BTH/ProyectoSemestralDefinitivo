type TextFieldProps = {
  label: string
  name: string
  type?: string
  maxLength?: number
  rows?: number
  error?: string
}

export function CampoTexto({ label, name, type = 'text', maxLength, rows, error }: TextFieldProps) {
  return (
    <div className="field-group">
      <label htmlFor={name}>{label}</label>
      {/* El mensaje aparece solo cuando el formulario entrega un error para este campo. */}
      {rows
        ? <textarea id={name} name={name} rows={rows} maxLength={maxLength} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />
        : <input id={name} name={name} type={type} maxLength={maxLength} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />}
      {error && <span className="field-error" id={`${name}-error`}>{error}</span>}
    </div>
  )
}
