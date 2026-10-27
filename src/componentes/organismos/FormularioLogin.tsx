import { useState, type FormEvent } from 'react'
import { Boton } from '../atomos/Boton'
import { CampoFormulario } from '../moleculas/CampoFormulario'
import { TarjetaFormulario } from '../moleculas/TarjetaFormulario'
import { esCorreoValido } from '../../utilidades'

export function FormularioLogin() {
  // Estado para guardar los datos del formulario
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [tipoAcceso, setTipoAcceso] = useState<'cliente' | 'administrador'>('cliente')
  const [mensaje, setMensaje] = useState('')

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // evita recargar la página
    setMensaje('')

    if (correo.trim() === '') {
      alert('Debe ingresar su correo')
      return
    }

    // Comprobamos que el correo tenga formato válido
    if (!esCorreoValido(correo)) {
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

    setMensaje(`Modo de acceso seleccionado: ${tipoAcceso === 'administrador' ? 'Administrador' : 'Cliente'}. El acceso real requiere validar la cuenta en un servidor.`)
  }

  return (
    <TarjetaFormulario title="Iniciar sesión">
      <form onSubmit={manejarEnvio} noValidate>
        <fieldset className="field-group access-role">
          <legend>Entrar como</legend>
          <label>
            <input
              type="radio"
              name="tipoAcceso"
              value="cliente"
              checked={tipoAcceso === 'cliente'}
              onChange={() => setTipoAcceso('cliente')}
            />
            Cliente
          </label>
          <label>
            <input
              type="radio"
              name="tipoAcceso"
              value="administrador"
              checked={tipoAcceso === 'administrador'}
              onChange={() => setTipoAcceso('administrador')}
            />
            Administrador
          </label>
        </fieldset>
        <CampoFormulario etiqueta="Correo electrónico:" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo} maxLength={100} />
        <CampoFormulario etiqueta="Contraseña:" tipo="password" nombre="clave" valor={clave} alCambiar={setClave} maxLength={50} />
        <p className="form-message" role="status" aria-live="polite">{mensaje}</p>
        <Boton type="submit">Ingresar</Boton>
      </form>
    </TarjetaFormulario>
  )
}
