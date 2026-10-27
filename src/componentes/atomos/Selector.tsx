type SelectOption = { value: string; label: string }

type SelectFieldProps = {
  label: string
  name: string
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  error?: string
}

export function Selector({ label, name, options, value, onChange, error }: SelectFieldProps) {
  return (
    <div className="field-group">
      <label htmlFor={name}>{label}</label>
      {/* El valor y callback opcionales permiten controlar el selector desde el formulario. */}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      {error && <span className="field-error" id={`${name}-error`}>{error}</span>}
    </div>
  )
}
