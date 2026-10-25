type SelectOption = { value: string; label: string }

type SelectFieldProps = {
  label: string
  name: string
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
}

export function Selector({ label, name, options, value, onChange }: SelectFieldProps) {
  return (
    <label>
      {label}
      <select
        name={name}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
      >
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  )
}
