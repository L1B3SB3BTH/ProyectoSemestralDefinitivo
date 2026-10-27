import { useState, type FormEvent } from 'react'
import { Boton } from '../atomos/Boton'
import { CampoFormulario } from '../moleculas/CampoFormulario'
import { TarjetaFormulario } from '../moleculas/TarjetaFormulario'
import { esCorreoValido } from '../../utilidades'

export function FormularioContacto() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState('')
  // Recupera las últimas consultas guardadas; el try/catch cubre datos locales inválidos.
  const [consultas, setConsultas] = useState<{ nombre: string; correo: string; mensaje: string; fecha: string }[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sonidoVivoConsultas') || '[]') as {
        nombre: string; correo: string; mensaje: string; fecha: string
      }[]
    } catch {
      return []
    }
  })

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Se valida cada campo por separado para mostrar ayuda junto al control correspondiente.
    const nextErrors: Record<string, string> = {}
    if (!nombre.trim()) nextErrors.nombre = 'Escribe tu nombre.'
    else if (nombre.trim().length < 2) nextErrors.nombre = 'El nombre debe tener al menos 2 caracteres.'
    if (!correo.trim()) nextErrors.correo = 'Escribe tu correo electrónico.'
    else if (!esCorreoValido(correo)) nextErrors.correo = 'Revisa el formato. Ejemplo: nombre@correo.cl.'
    if (!mensaje.trim()) nextErrors.mensaje = 'Cuéntanos en qué podemos ayudarte.'
    else if (mensaje.trim().length < 10) nextErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('Revisa los campos marcados para continuar.')
      return
    }

    // Guarda las consultas localmente y limita el historial a cinco entradas recientes.
    const consulta = { nombre: nombre.trim(), correo: correo.trim(), mensaje: mensaje.trim(), fecha: new Date().toISOString() }
    const updatedConsultas = [consulta, ...consultas].slice(0, 5)
    localStorage.setItem('sonidoVivoConsultas', JSON.stringify(updatedConsultas))
    setConsultas(updatedConsultas)
    setStatus('Consulta guardada en este dispositivo.')
    setNombre('')
    setCorreo('')
    setMensaje('')
    setErrors({})
  }

  return (
    <div className="registration-layout contact-layout">
      <TarjetaFormulario title="Hablemos de sonido">
        <p className="form-intro">Déjanos tu consulta y la tendrás guardada aquí para revisarla.</p>
        <form onSubmit={manejarEnvio} noValidate>
          <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre} maxLength={100} error={errors.nombre} />
          <CampoFormulario etiqueta="Correo electrónico" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo} maxLength={100} error={errors.correo} />
          <CampoFormulario etiqueta="¿En qué podemos ayudarte?" tipo="text" nombre="mensaje" valor={mensaje} alCambiar={setMensaje} maxLength={500} filas={6} error={errors.mensaje} />
          <p className={`form-message ${Object.keys(errors).length ? 'has-errors' : ''}`} role={Object.keys(errors).length ? 'alert' : 'status'} aria-live="polite">{status}</p>
          <Boton type="submit">Guardar consulta</Boton>
        </form>
      </TarjetaFormulario>
      <aside className="profile-panel contact-history" aria-live="polite">
        <p className="eyebrow">TUS CONSULTAS</p>
        <h2>{consultas.length ? 'Guardadas en este navegador' : 'Tu mensaje aparecerá aquí'}</h2>
        <p className="local-storage-note">Estas consultas solo quedan guardadas en este dispositivo; para enviarlas al equipo hay que conectar un servicio de backend.</p>
        {consultas.length > 0 && (
          <ul className="consultation-list">
            {consultas.map((consulta) => (
              <li key={`${consulta.fecha}-${consulta.correo}`}>
                <strong>{consulta.nombre}</strong>
                <time dateTime={consulta.fecha}>{new Date(consulta.fecha).toLocaleString('es-CL')}</time>
                <p>{consulta.mensaje}</p>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  )
}
