import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { FormularioContacto } from '../componentes/organismos/FormularioContacto'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

it('1. renderiza el formulario de contacto', () => {
  render(<FormularioContacto />)

  expect(screen.getByRole('button', { name: 'Guardar consulta' })).toBeTruthy()
  expect(screen.getByRole('textbox', { name: 'Nombre' })).toBeTruthy()
})

it('2. comienza con el campo nombre vacío', () => {
  render(<FormularioContacto />)

  expect((screen.getByRole('textbox', { name: 'Nombre' }) as HTMLInputElement).value).toBe('')
})

it('3. actualiza el campo al escribir', () => {
  render(<FormularioContacto />)
  const campoNombre = screen.getByRole('textbox', { name: 'Nombre' }) as HTMLInputElement

  fireEvent.change(campoNombre, { target: { value: 'Laura Pérez' } })

  expect(campoNombre.value).toBe('Laura Pérez')
})

it('4. responde al envío con datos inválidos', () => {
  render(<FormularioContacto />)

  fireEvent.click(screen.getByRole('button', { name: 'Guardar consulta' }))

  expect(screen.getByText('Revisa los campos marcados para continuar.')).toBeTruthy()
})

it('5. muestra un mensaje de error cuando falta el nombre', () => {
  render(<FormularioContacto />)

  fireEvent.click(screen.getByRole('button', { name: 'Guardar consulta' }))

  expect(screen.getByText('Escribe tu nombre.')).toBeTruthy()
  expect(screen.getByRole('textbox', { name: 'Nombre' }).getAttribute('aria-invalid')).toBe('true')
})

it('6. no muestra errores inicialmente', () => {
  render(<FormularioContacto />)

  expect(screen.queryByText('Escribe tu nombre.')).toBeNull()
  expect(screen.queryByText('Revisa los campos marcados para continuar.')).toBeNull()
})

it('7. guarda y muestra una consulta válida', () => {
  render(<FormularioContacto />)

  fireEvent.change(screen.getByRole('textbox', { name: 'Nombre' }), { target: { value: 'Laura Pérez' } })
  fireEvent.change(screen.getByRole('textbox', { name: 'Correo electrónico' }), { target: { value: 'laura@correo.cl' } })
  fireEvent.change(screen.getByRole('textbox', { name: '¿En qué podemos ayudarte?' }), { target: { value: 'Quiero conocer disponibilidad de parlantes.' } })
  fireEvent.click(screen.getByRole('button', { name: 'Guardar consulta' }))

  expect(screen.getByText('Consulta guardada en este dispositivo.')).toBeTruthy()
  expect(screen.getByText('Quiero conocer disponibilidad de parlantes.')).toBeTruthy()
  expect(JSON.parse(localStorage.getItem('sonidoVivoConsultas') || '[]').length).toBe(1)
  expect((screen.getByRole('textbox', { name: 'Nombre' }) as HTMLInputElement).value).toBe('')
})