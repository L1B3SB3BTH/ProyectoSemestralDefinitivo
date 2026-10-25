import { useState, type FormEvent } from 'react'
import { Boton } from '../atomos/Boton'
import { CampoFormulario } from '../moleculas/CampoFormulario'
import { TarjetaFormulario } from '../moleculas/TarjetaFormulario'

export function FormularioLogin() {
  // Estado para guardar los datos del formulario
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // evita recargar la página

    if (correo.trim() === '') {
      alert('Debe ingresar su correo')
      return
    }

    // Comprobamos que el correo tenga formato válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      alert('Ingrese un correo válido')
      return
    }

    if (clave.trim() === '') {
      alert('Debe ingresar su contraseña')
      return
    }

    if (clave.length < 8) {
      alert('La contraseña debe tener mínimo 8 caracteres')
      return
    }

    alert('Datos ingresados correctamente')
  }

  return (
    <TarjetaFormulario title="Iniciar sesión">
      <form onSubmit={manejarEnvio} noValidate>
        <CampoFormulario etiqueta="Correo electrónico:" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo} maxLength={100} />
        <CampoFormulario etiqueta="Contraseña:" tipo="password" nombre="clave" valor={clave} alCambiar={setClave} maxLength={50} />
        <Boton type="submit">Ingresar</Boton>
      </form>
    </TarjetaFormulario>
  )
}
