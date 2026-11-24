import { useState, type FormEvent } from 'react'
import { Boton } from '../atomos/Boton'
import { CampoFormulario } from '../moleculas/CampoFormulario'
import { TarjetaFormulario } from '../moleculas/TarjetaFormulario'
import { esCorreoValido } from '../../utilidades'
import { API_CONTACTO } from '../../api'

export function FormularioContacto() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [asunto, setAsunto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState('')
  const [cargando, setCargando] = useState(false)
  const [consultas, setConsultas] = useState<{ id?: number; nombre: string; correo: string; asunto: string; mensaje: string; fecha: string }[]>([])

  const manejarEnvio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}

    if (!nombre.trim()) nextErrors.nombre = 'Escribe tu nombre.'
    else if (nombre.trim().length < 2) nextErrors.nombre = 'El nombre debe tener al menos 2 caracteres.'
    if (!correo.trim()) nextErrors.correo = 'Escribe tu correo electrónico.'
    else if (!esCorreoValido(correo)) nextErrors.correo = 'Revisa el formato. Ejemplo: nombre@correo.cl.'
    if (!asunto.trim()) nextErrors.asunto = 'Escribe el asunto de tu consulta.'
    if (!mensaje.trim()) nextErrors.mensaje = 'Cuéntanos en qué podemos ayudarte.'
    else if (mensaje.trim().length < 10) nextErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('Revisa los campos marcados para continuar.')
      return
    }

    try {
      setCargando(true)
      setStatus('')

      const respuesta = await fetch(`${API_CONTACTO}/contactos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          correo: correo.trim(),
          asunto: asunto.trim(),
          mensaje: mensaje.trim(),
        }),
      })

      if (!respuesta.ok) {
        const errorData = await respuesta.json().catch(() => null)
        setStatus(errorData?.message || 'No se pudo enviar tu consulta. Revisa los datos ingresados.')
        return
      }

      const data = await respuesta.json()
      const nuevaConsulta = {
        id: data.id,
        nombre: nombre.trim(),
        correo: correo.trim(),
        asunto: asunto.trim(),
        mensaje: mensaje.trim(),
        fecha: new Date().toISOString(),
      }

      setConsultas((prev) => [nuevaConsulta, ...prev].slice(0, 5))
      setStatus(data.mensaje || 'Recibimos tu mensaje. Te responderemos pronto.')
      setNombre('')
      setCorreo('')
      setAsunto('')
      setMensaje('')
      setErrors({})
    } catch {
      setStatus('No se pudo conectar con contacto-service (puerto 8084).')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="registration-layout contact-layout">
      <TarjetaFormulario title="Hablemos de sonido">
        <p className="form-intro mb-4">
          Déjanos tu consulta y nuestro equipo la recibirá directamente en el sistema.
        </p>

        <form onSubmit={manejarEnvio} noValidate>
          <CampoFormulario
            etiqueta="Nombre"
            tipo="text"
            nombre="nombre"
            valor={nombre}
            alCambiar={setNombre}
            maxLength={100}
            error={errors.nombre}
          />
          <CampoFormulario
            etiqueta="Correo electrónico"
            tipo="email"
            nombre="correo"
            valor={correo}
            alCambiar={setCorreo}
            maxLength={100}
            error={errors.correo}
          />
          <CampoFormulario
            etiqueta="Asunto"
            tipo="text"
            nombre="asunto"
            valor={asunto}
            alCambiar={setAsunto}
            maxLength={150}
            error={errors.asunto}
          />
          <CampoFormulario
            etiqueta="¿En qué podemos ayudarte?"
            tipo="text"
            nombre="mensaje"
            valor={mensaje}
            alCambiar={setMensaje}
            maxLength={500}
            filas={5}
            error={errors.mensaje}
          />

          {status && (
            <p
              className={`form-message mt-3 mb-2 ${Object.keys(errors).length ? 'has-errors' : ''}`}
              role={Object.keys(errors).length ? 'alert' : 'status'}
              aria-live="polite"
            >
              {status}
            </p>
          )}

          <div className="mt-4">
            <Boton type="submit" className="w-100 py-2 px-4 fw-semibold" style={{ maxWidth: '240px' }} disabled={cargando}>
              {cargando ? 'Enviando...' : 'Enviar consulta'}
            </Boton>
          </div>
        </form>
      </TarjetaFormulario>

      <aside className="profile-panel contact-history" aria-live="polite">
        <p className="eyebrow">ESTADO DE ENVÍO</p>
        <h2 className="mb-3">
          {consultas.length ? 'Consultas enviadas' : 'Tu confirmación aparecerá aquí'}
        </h2>
        <p className="local-storage-note">
          Al enviar el formulario, tu mensaje queda registrado en la base de datos para que un administrador lo responda.
        </p>

        {consultas.length > 0 && (
          <ul className="consultation-list list-unstyled d-flex flex-column gap-3 mt-4 mb-0">
            {consultas.map((consulta, idx) => (
              <li
                key={`${consulta.fecha}-${idx}`}
                className="p-3 rounded-3 bg-light border"
              >
                <div className="d-flex justify-content-between align-items-baseline gap-2 mb-1">
                  <strong>{consulta.asunto}</strong>
                  <time className="text-muted small" dateTime={consulta.fecha}>
                    {new Date(consulta.fecha).toLocaleString('es-CL')}
                  </time>
                </div>
                <p className="mb-0 text-secondary small">{consulta.mensaje}</p>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  )
}