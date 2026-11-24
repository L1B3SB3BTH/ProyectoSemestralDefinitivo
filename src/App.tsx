import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './componentes/organismos/Navbar'
import { PiePagina } from './componentes/organismos/PiePagina'
import { Nosotros } from './paginas/Nosotros'
import { Contacto } from './paginas/Contacto'
import { Inicio } from './paginas/inicio'
import { Login } from './paginas/Login'
import { DetalleNovedad } from './paginas/detalleNovedad'
import { Novedades } from './paginas/Novedades'
import { Registro } from './paginas/Registro'
import { Productos } from './paginas/Productos'
import { DetalleProducto } from './paginas/DetalleProducto'
import { Seleccion } from './paginas/Seleccion'
import { Admin } from './paginas/Admin'
import { API_CARRITO, API_PRODUCTOS } from './api'
import { obtenerAuthHeaders, obtenerSesion } from './utilidades'

const selectionKey = 'seleccionSonidoVivo'

export type Producto = {
  id: number
  nombre: string
  precio: number
  imagen: string
  descripcion: string
}

type ItemCarritoBackend = {
  id: number
  productoId: number
  nombreProducto: string
  precioUnitario: number
  cantidad: number
}

const novedades = [
  {
    id: '1',
    title: 'Llegó el nuevo Set de Parlantes Torre',
    image: '/imagenes/paginaPrincipal/parlantes3.jpg',
    summary: 'Ya está disponible nuestro nuevo set de torres de sonido, ideal para fiestas y eventos grandes.',
    paragraphs: [
      'Después de meses de pruebas, por fin sumamos a nuestro catálogo el nuevo Set de Parlantes Torre: dos torres activas con graves profundos, conexión Bluetooth estable y entradas auxiliares.',
      'Están pensadas para fiestas, eventos familiares o pequeñas presentaciones en vivo, donde se necesita volumen y claridad sin perder calidad de sonido.',
    ],
  },
  {
    id: '2',
    title: '5 consejos para cuidar tus equipos de sonido',
    image: '/imagenes/paginaPrincipal/equipodesonido1.webp',
    summary: 'Algunas recomendaciones simples para que tus parlantes y equipos duren muchos años más.',
    paragraphs: ['Un buen equipo de sonido dura años si le das los cuidados básicos. Aquí van cinco recomendaciones simples:'],
    tips: [
      'Evita el volumen al máximo por tiempos prolongados.',
      'Protégelos de la humedad.',
      'Desconéctalos durante tormentas eléctricas.',
      'Limpia el polvo regularmente.',
      'Guarda los cables enrollados sin forzar.',
    ],
  },
]

// Convierte la lista de ItemCarrito de MySQL al arreglo de IDs repetidos que usa Seleccion.tsx
function expandirItemsASelection(items: ItemCarritoBackend[]): number[] {
  const resultado: number[] = []
  for (const item of items) {
    for (let i = 0; i < item.cantidad; i++) {
      resultado.push(item.productoId)
    }
  }
  return resultado
}

function AppContent() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [itemsCarrito, setItemsCarrito] = useState<ItemCarritoBackend[]>([])
  const [selection, setSelection] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(selectionKey) || '[]') as number[]
    } catch {
      return []
    }
  })

  // 1. Cargar productos desde MySQL (productos-service: 8083)
  const cargarProductos = async () => {
    try {
      const res = await fetch(`${API_PRODUCTOS}/productos`)
      if (res.ok) {
        const data = await res.json()
        setProductos(data)
      }
    } catch (error) {
      console.error('Error al cargar productos desde el servidor:', error)
    }
  }

  // 2. Cargar carrito del usuario autenticado desde MySQL (carrito-service: 8082)
  const cargarCarrito = async () => {
    const sesion = obtenerSesion()
    if (!sesion) return

    try {
      const res = await fetch(`${API_CARRITO}/carritos/mio`, {
        headers: obtenerAuthHeaders(),
      })
      if (res.ok) {
        const data = (await res.json()) as ItemCarritoBackend[]
        setItemsCarrito(data)
        setSelection(expandirItemsASelection(data))
      }
    } catch (error) {
      console.error('Error al cargar carrito desde el servidor:', error)
    }
  }

  useEffect(() => {
    cargarProductos()
    cargarCarrito()
  }, [])

  useEffect(() => {
    if (!obtenerSesion()) {
      localStorage.setItem(selectionKey, JSON.stringify(selection))
    }
  }, [selection])

  // CRUD de Productos (Solo Administrador con Token JWT)
  const agregarProducto = async (nuevo: { nombre: string; precio: number; imagen: string; descripcion: string }) => {
    try {
      const res = await fetch(`${API_PRODUCTOS}/productos`, {
        method: 'POST',
        headers: obtenerAuthHeaders(),
        body: JSON.stringify(nuevo),
      })
      if (res.ok) {
        const creado = (await res.json()) as Producto
        setProductos((actuales) => [creado, ...actuales])
      } else {
        alert('No se pudo guardar el producto. Verifica que iniciaste sesión como Administrador.')
      }
    } catch {
      alert('Error de conexión con productos-service (puerto 8083).')
    }
  }

  const eliminarProducto = async (id: number) => {
    try {
      const res = await fetch(`${API_PRODUCTOS}/productos/${id}`, {
        method: 'DELETE',
        headers: obtenerAuthHeaders(),
      })
      if (res.ok) {
        setProductos((actuales) => actuales.filter((p) => p.id !== id))
        setSelection((actuales) => actuales.filter((itemId) => itemId !== id))
      } else {
        alert('No se pudo eliminar el producto. Verifica tus permisos de Administrador.')
      }
    } catch {
      alert('Error de conexión con productos-service (puerto 8083).')
    }
  }

  // Operaciones del Carrito (sincronizadas con MySQL si hay sesión activa)
  const add = async (productoId: number) => {
    const sesion = obtenerSesion()
    if (!sesion) {
      setSelection((current) => [...current, productoId])
      return
    }

    const producto = productos.find((p) => p.id === productoId)
    if (!producto) return

    try {
      const res = await fetch(`${API_CARRITO}/carritos/mio`, {
        method: 'POST',
        headers: obtenerAuthHeaders(),
        body: JSON.stringify({
          productoId: producto.id,
          nombreProducto: producto.nombre,
          precioUnitario: producto.precio,
          cantidad: 1,
        }),
      })
      if (res.ok) {
        await cargarCarrito()
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error)
    }
  }

  const remove = async (productoId: number) => {
    const sesion = obtenerSesion()
    if (!sesion) {
      setSelection((current) => {
        const index = current.lastIndexOf(productoId)
        return index === -1 ? current : current.filter((_, itemIndex) => itemIndex !== index)
      })
      return
    }

    const item = itemsCarrito.find((i) => i.productoId === productoId)
    if (!item) return

    try {
      if (item.cantidad > 1) {
        const res = await fetch(`${API_CARRITO}/carritos/mio/${item.id}`, {
          method: 'PUT',
          headers: obtenerAuthHeaders(),
          body: JSON.stringify({ cantidad: item.cantidad - 1 }),
        })
        if (res.ok) await cargarCarrito()
      } else {
        const res = await fetch(`${API_CARRITO}/carritos/mio/${item.id}`, {
          method: 'DELETE',
          headers: obtenerAuthHeaders(),
        })
        if (res.ok) await cargarCarrito()
      }
    } catch (error) {
      console.error('Error al quitar del carrito:', error)
    }
  }

  const checkout = async () => {
    const sesion = obtenerSesion()
    if (!sesion) {
      setSelection([])
      return
    }

    try {
      const res = await fetch(`${API_CARRITO}/carritos/mio`, {
        method: 'DELETE',
        headers: obtenerAuthHeaders(),
      })
      if (res.ok) {
        setItemsCarrito([])
        setSelection([])
      }
    } catch (error) {
      console.error('Error al vaciar carrito:', error)
    }
  }

  return (
    <div className="app-layout">
      <Navbar selectionCount={selection.length} />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Inicio productos={productos} novedades={novedades} onAdd={add} />} />
          <Route path="/productos" element={<Productos productos={productos} onAdd={add} />} />
          <Route path="/productos/:id" element={<DetalleProducto productos={productos} onAdd={add} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/novedades" element={<Novedades novedades={novedades} />} />
          <Route path="/novedades/:id" element={<DetalleNovedad novedades={novedades} />} />
          <Route path="/seleccion" element={<Seleccion productos={productos} selection={selection} onAdd={add} onRemove={remove} onCheckout={checkout} />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/admin"
            element={
              <Admin
                productos={productos}
                onAgregarProducto={agregarProducto}
                onEliminarProducto={eliminarProducto}
              />
            }
          />
          <Route path="*" element={<Inicio productos={productos} novedades={novedades} onAdd={add} />} />
        </Routes>
      </main>

      <PiePagina />
    </div>
  )
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>
}