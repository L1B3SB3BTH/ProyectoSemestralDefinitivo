import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { FormularioLogin } from '../componentes/organismos/FormularioLogin'

afterEach(cleanup)

it('permite elegir el acceso como cliente o administrador', () => {
  render(<FormularioLogin />)

  expect(screen.getByRole('radio', { name: 'Cliente' })).toBeTruthy()
  expect(screen.getByRole('radio', { name: 'Administrador' })).toBeTruthy()
  expect((screen.getByRole('radio', { name: 'Cliente' }) as HTMLInputElement).checked).toBe(true)
})

it('muestra el modo administrador elegido al ingresar datos válidos', () => {
  render(<FormularioLogin />)

  fireEvent.change(screen.getByRole('textbox', { name: 'Correo electrónico:' }), { target: { value: 'admin@sonidovivo.cl' } })
  fireEvent.change(screen.getByLabelText('Contraseña:'), { target: { value: 'clave-segura' } })
  fireEvent.click(screen.getByRole('radio', { name: 'Administrador' }))
  fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

  expect(screen.getByRole('status').textContent).toContain('Administrador')
})