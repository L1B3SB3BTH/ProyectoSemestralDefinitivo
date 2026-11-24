import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Boton } from '../atomos/Boton'
import { CampoFormulario } from '../moleculas/CampoFormulario'
import { TarjetaFormulario } from '../moleculas/TarjetaFormulario'
import { esCorreoValido, guardarSesion, type SesionUsuario } from '../../utilidades'

export function FormularioLogin() {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  const manejarEnvio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMensaje('')

    if (correo.trim() === '') {
      setMensaje('Debe ingresar su correo.')
      return
    }

    if (!esCorreoValido(correo)) {
      setMensaje('Ingrese un correo válido.')
      return
    }

    if (clave.trim() === '') {
      setMensaje('Debe ingresar su contraseña.')
      return
    }

    if (clave.length < 8) {
      setMensaje('La contraseña debe tener mínimo 8 caracteres.')
      return
    }

    try {
      setCargando(true)
      const respuesta = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: correo.trim(),
          clave,
        }),
      })

      if (!respuesta.ok) {
        setMensaje('Credenciales incorrectas. Verifica tu correo y contraseña.')
        return
      }

      const respuestaJson = await respuesta.json()
      const sesion: SesionUsuario = {
        token: respuestaJson.token,
        nombre: respuestaJson.usuario.nombre,
        correo: respuestaJson.usuario.correo,
        rol: respuestaJson.usuario.rol,
      }

      guardarSesion(sesion)

      if (sesion.rol === 'ADMINISTRADOR') {
        setMensaje(`Bienvenido, ${sesion.nombre}. Redirigiendo al panel...`)
        navigate('/admin')
      } else {
        setMensaje(`Bienvenido, ${sesion.nombre}.`)
        navigate('/productos')
      }
    } catch {
      setMensaje('No se pudo conectar con el servidor de autenticación.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="mx-auto my-4" style={{ maxWidth: '460px' }}>
      <TarjetaFormulario title="Iniciar sesión">
        <form onSubmit={manejarEnvio} noValidate>
          <CampoFormulario
            etiqueta="Correo electrónico:"
            tipo="email"
            nombre="correo"
            valor={correo}
            alCambiar={setCorreo}
            maxLength={100}
          />
          <CampoFormulario
            etiqueta="Contraseña:"
            tipo="password"
            nombre="clave"
            valor={clave}
            alCambiar={setClave}
            maxLength={50}
          />

          <p className="form-message mt-2" role="status" aria-live="polite">
            {mensaje}
          </p>

          <Boton type="submit" className="w-100 py-2 mt-2 fw-semibold" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </Boton>
        </form>
      </TarjetaFormulario>
    </div>
  )
}