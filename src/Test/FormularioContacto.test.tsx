// @vitest-environment jsdom
import { afterEach, expect, test } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { FormularioContacto } from '../componentes/organismos/FormularioContacto'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

test('muestra errores debajo de los campos obligatorios', () => {
  render(<FormularioContacto />)

  fireEvent.click(screen.getByRole('button', { name: 'Guardar consulta' }))

  expect(screen.getByText('Escribe tu nombre.')).toBeTruthy()
  expect(screen.getByText('Escribe tu correo electrónico.')).toBeTruthy()
  expect(screen.getByText('Cuéntanos en qué podemos ayudarte.')).toBeTruthy()
  expect(screen.getByRole('textbox', { name: 'Nombre' }).getAttribute('aria-invalid')).toBe('true')
})

test('guarda y muestra una consulta válida en el panel local', () => {
  render(<FormularioContacto />)

  fireEvent.change(screen.getByRole('textbox', { name: 'Nombre' }), { target: { value: 'Laura Pérez' } })
  fireEvent.change(screen.getByRole('textbox', { name: 'Correo electrónico' }), { target: { value: 'laura@correo.cl' } })
  fireEvent.change(screen.getByRole('textbox', { name: '¿En qué podemos ayudarte?' }), { target: { value: 'Quiero conocer disponibilidad de parlantes.' } })
  fireEvent.click(screen.getByRole('button', { name: 'Guardar consulta' }))

  expect(screen.getByText('Consulta guardada en este dispositivo.')).toBeTruthy()
  expect(screen.getByText('Quiero conocer disponibilidad de parlantes.')).toBeTruthy()
  expect(JSON.parse(localStorage.getItem('sonidoVivoConsultas') || '[]')).toHaveLength(1)
})