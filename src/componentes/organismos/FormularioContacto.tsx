import { useState, type FormEvent } from 'react'
import { Boton } from '../atomos/Boton'
import { CampoFormulario } from '../moleculas/CampoFormulario'
import { TarjetaFormulario } from '../moleculas/TarjetaFormulario'

export function FormularioContacto() {
  // Estado para guardar los datos del formulario
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState('')

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // evita recargar la página

    if (nombre.trim() === '' || correo.trim() === '' || mensaje.trim() === '') {
      alert('Los campos no pueden estar vacíos')
      return
    }

    if (nombre.trim().length < 10) {
      alert('El nombre debe tener al menos 10 caracteres')
      return
    }

    // Comprobamos que el correo tenga formato válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      alert('El correo no es válido')
      return
    }

    if (mensaje.trim().length < 10) {
      alert('El mensaje debe tener al menos 10 caracteres')
      return
    }

    alert('Formulario enviado correctamente')
    setNombre('')
    setCorreo('')
    setMensaje('')
  }

  return (
    <TarjetaFormulario title="¿Tienes alguna duda? Contáctanos">
      <form onSubmit={manejarEnvio} noValidate>
        <CampoFormulario etiqueta="Nombre:" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre} maxLength={100} />
        <CampoFormulario etiqueta="Correo electrónico:" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo} maxLength={100} />
        <CampoFormulario etiqueta="Mensaje:" tipo="text" nombre="mensaje" valor={mensaje} alCambiar={setMensaje} maxLength={500} filas={6} />
        <Boton type="submit">Enviar</Boton>
      </form>
    </TarjetaFormulario>
  )
}
