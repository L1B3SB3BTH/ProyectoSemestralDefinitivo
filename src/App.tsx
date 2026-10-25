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

const selectionKey = 'seleccionSonidoVivo'

const productos = [
  {
    id: 1,
    nombre: 'Parlante Bluetooth XR200',
    precio: 29990,
    imagen: '/imagenes/paginaPrincipal/parlantes.webp',
    descripcion: 'Parlante portátil con sonido potente y batería de larga duración.',
  },
  {
    id: 2,
    nombre: 'Set de Parlantes Torre',
    precio: 89990,
    imagen: '/imagenes/paginaPrincipal/parlantes3.jpg',
    descripcion: 'Torre de sonido ideal para fiestas y eventos, con graves profundos.',
  },
  {
    id: 3,
    nombre: 'Mini Parlante Portátil',
    precio: 19990,
    imagen: '/imagenes/paginaPrincipal/parlantes2.webp',
    descripcion: 'Compacto y liviano, perfecto para llevarlo a todos lados.',
  },
  {
    id: 4,
    nombre: 'Audífonos',
    precio: 29990,
    imagen: '/img/audifonos.jpg',
    descripcion: 'Audífonos Bluetooth inalámbricos.',
  },
]

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

function AppContent() {
  const [selection, setSelection] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(selectionKey) || '[]') as number[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(selectionKey, JSON.stringify(selection))
  }, [selection])

  const add = (id: number) => setSelection((current) => current.includes(id) ? current : [...current, id])
  const remove = (id: number) => setSelection((current) => current.filter((item) => item !== id))

  return (
    <>
      <Navbar selectionCount={selection.length} />
      <Routes>
        <Route path="/" element={<Inicio productos={productos} novedades={novedades} onAdd={add} />} />
        <Route path="/productos" element={<Productos productos={productos} onAdd={add} />} />
        {/* Ruta dinámica: muestra el detalle según el id del producto */}
        <Route path="/productos/:id" element={<DetalleProducto productos={productos} onAdd={add} />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/novedades" element={<Novedades novedades={novedades} />} />
        <Route path="/novedades/:id" element={<DetalleNovedad novedades={novedades} />} />
        <Route path="/seleccion" element={<Seleccion productos={productos} selection={selection} onRemove={remove} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Inicio productos={productos} novedades={novedades} onAdd={add} />} />
      </Routes>
      <PiePagina />
    </>
  )
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>
}
