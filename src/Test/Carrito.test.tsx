// @vitest-environment jsdom
import { afterEach, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SeleccionProductos } from '../componentes/organismos/SeleccionProductos'

afterEach(cleanup)

const productos = [
  { id: 1, nombre: 'Parlante portátil', precio: 19990, imagen: '/parlante.jpg', descripcion: 'Parlante de prueba.' },
]

test('confirma el pago de demostración y solicita vaciar el carrito', () => {
  const onCheckout = vi.fn()

  render(
    <MemoryRouter>
      <SeleccionProductos productos={productos} selection={[1, 1]} onAdd={vi.fn()} onRemove={vi.fn()} onCheckout={onCheckout} />
    </MemoryRouter>,
  )

  fireEvent.click(screen.getByRole('button', { name: 'Pagar $39.980' }))

  expect(onCheckout).toHaveBeenCalledTimes(1)
  expect(screen.getByText('Compra de demostración completada. No se realizó ningún cobro.')).toBeTruthy()
})

test('no muestra la opción de pago con el carrito vacío', () => {
  render(
    <MemoryRouter>
      <SeleccionProductos productos={productos} selection={[]} onAdd={vi.fn()} onRemove={vi.fn()} onCheckout={vi.fn()} />
    </MemoryRouter>,
  )

  expect(screen.queryByRole('button', { name: /Pagar/ })).toBeNull()
})