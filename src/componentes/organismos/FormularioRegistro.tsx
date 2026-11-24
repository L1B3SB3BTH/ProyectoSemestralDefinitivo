import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Boton } from '../atomos/Boton'
import { Selector } from '../atomos/Selector'
import { CampoTexto } from '../atomos/CampoTexto'
import { TarjetaFormulario } from '../moleculas/TarjetaFormulario'
import { API_USUARIOS } from '../../api'

const regiones: { nombre: string; comunas: string[] }[] = [
  {
    nombre: 'Arica y Parinacota',
    comunas: ['Arica', 'Camarones', 'General Lagos', 'Putre'],
  },
  {
    nombre: 'Tarapacá',
    comunas: ['Alto Hospicio', 'Camiña', 'Colchane', 'Huara', 'Iquique', 'Pica', 'Pozo Almonte'],
  },
  {
    nombre: 'Antofagasta',
    comunas: ['Antofagasta', 'Calama', 'María Elena', 'Mejillones', 'Ollagüe', 'San Pedro de Atacama', 'Sierra Gorda', 'Taltal', 'Tocopilla'],
  },
  {
    nombre: 'Atacama',
    comunas: ['Alto del Carmen', 'Caldera', 'Chañaral', 'Copiapó', 'Diego de Almagro', 'Freirina', 'Huasco', 'Tierra Amarilla', 'Vallenar'],
  },
  {
    nombre: 'Coquimbo',
    comunas: ['Andacollo', 'Canela', 'Combarbalá', 'Coquimbo', 'Illapel', 'La Higuera', 'La Serena', 'Los Vilos', 'Monte Patria', 'Ovalle', 'Paiguano', 'Punitaqui', 'Río Hurtado', 'Salamanca', 'Vicuña'],
  },
  {
    nombre: 'Valparaíso',
    comunas: ['Algarrobo', 'Cabildo', 'Calera', 'Cartagena', 'Casablanca', 'Catemu', 'Concón', 'El Quisco', 'El Tabo', 'Hijuelas', 'Isla de Pascua', 'Juan Fernández', 'La Cruz', 'La Ligua', 'Limache', 'Llay-Llay', 'Los Andes', 'Nogales', 'Olmué', 'Panquehue', 'Papudo', 'Petorca', 'Puchuncaví', 'Putaendo', 'Quillota', 'Quilpué', 'Quintero', 'Rinconada', 'San Antonio', 'San Esteban', 'San Felipe', 'Santa María', 'Santo Domingo', 'Valparaíso', 'Villa Alemana', 'Viña del Mar', 'Zapallar'],
  },
  {
    nombre: 'Región Metropolitana de Santiago',
    comunas: ['Alhué', 'Buin', 'Calera de Tango', 'Cerrillos', 'Cerro Navia', 'Colina', 'Conchalí', 'Curacaví', 'El Bosque', 'El Monte', 'Estación Central', 'Huechuraba', 'Independencia', 'Isla de Maipo', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Lampa', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'María Pinto', 'Melipilla', 'Ñuñoa', 'Padre Hurtado', 'Paine', 'Pedro Aguirre Cerda', 'Peñaflor', 'Peñalolén', 'Pirque', 'Providencia', 'Pudahuel', 'Puente Alto', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Bernardo', 'San Joaquín', 'San José de Maipo', 'San Miguel', 'San Pedro', 'San Ramón', 'Santiago', 'Talagante', 'Tiltil', 'Vitacura'],
  },
  {
    nombre: "O'Higgins",
    comunas: ['Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'La Estrella', 'Las Cabras', 'Litueche', 'Lolol', 'Machalí', 'Malloa', 'Marchigüe', 'Mostazal', 'Nancagua', 'Navidad', 'Olivar', 'Palmilla', 'Paredones', 'Peralillo', 'Peumo', 'Pichidegua', 'Pichilemu', 'Placilla', 'Pumanque', 'Quinta de Tilcoco', 'Rancagua', 'Rengo', 'Requínoa', 'San Fernando', 'San Francisco de Mostazal', 'San Vicente'],
  },
  {
    nombre: 'Maule',
    comunas: ['Cauquenes', 'Chanco', 'Colbún', 'Constitución', 'Curepto', 'Curicó', 'Empedrado', 'Hualañé', 'Licantén', 'Linares', 'Longaví', 'Maule', 'Molina', 'Parral', 'Pelarco', 'Pelluhue', 'Pencahue', 'Rauco', 'Retiro', 'Río Claro', 'Romeral', 'Sagrada Familia', 'San Clemente', 'San Javier', 'San Rafael', 'Talca', 'Teno', 'Vichuquén', 'Villa Alegre', 'Yerbas Buenas'],
  },
  {
    nombre: 'Ñuble',
    comunas: ['Bulnes', 'Chillán', 'Chillán Viejo', 'Cobquecura', 'Coelemu', 'Coihueco', 'El Carmen', 'Ninhue', 'Ñiquén', 'Pemuco', 'Pinto', 'Portezuelo', 'Quillón', 'Quirihue', 'Ránquil', 'San Carlos', 'San Fabián', 'San Ignacio', 'San Nicolás', 'Treguaco', 'Yungay'],
  },
  {
    nombre: 'Biobío',
    comunas: ['Alto Biobío', 'Antuco', 'Arauco', 'Cabrero', 'Cañete', 'Chiguayante', 'Concepción', 'Contulmo', 'Curanilahue', 'Florida', 'Hualpén', 'Hualqui', 'Laja', 'Lebu', 'Los Álamos', 'Los Ángeles', 'Lota', 'Mulchén', 'Nacimiento', 'Negrete', 'Penco', 'Quilaco', 'Quilleco', 'San Pedro de la Paz', 'San Rosendo', 'Santa Bárbara', 'Santa Juana', 'Talcahuano', 'Tirúa', 'Tomé', 'Tucapel', 'Yumbel'],
  },
  {
    nombre: 'La Araucanía',
    comunas: ['Angol', 'Carahue', 'Cholchol', 'Collipulli', 'Cunco', 'Curacautín', 'Curarrehue', 'Ercilla', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Purén', 'Renaico', 'Saavedra', 'Temuco', 'Teodoro Schmidt', 'Toltén', 'Traiguén', 'Victoria', 'Vilcún', 'Villarrica'],
  },
  {
    nombre: 'Los Ríos',
    comunas: ['Corral', 'Futrono', 'La Unión', 'Lago Ranco', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'Río Bueno', 'Valdivia'],
  },
  {
    nombre: 'Los Lagos',
    comunas: ['Ancud', 'Calbuco', 'Castro', 'Chaitén', 'Chonchi', 'Cochamó', 'Curaco de Vélez', 'Dalcahue', 'Fresia', 'Frutillar', 'Futaleufú', 'Hualaihué', 'Llanquihue', 'Los Muermos', 'Maullín', 'Osorno', 'Palena', 'Puerto Montt', 'Puerto Octay', 'Puerto Varas', 'Puqueldón', 'Purranque', 'Puyehue', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Río Negro', 'San Juan de la Costa', 'San Pablo'],
  },
  {
    nombre: 'Aysén',
    comunas: ['Aysén', 'Chile Chico', 'Cisnes', 'Cochrane', 'Coyhaique', 'Guaitecas', 'Lago Verde', "O'Higgins", 'Río Ibáñez'],
  },
  {
    nombre: 'Magallanes y de la Antártica Chilena',
    comunas: ['Antártica', 'Cabo de Hornos', 'Laguna Blanca', 'Natales', 'Porvenir', 'Primavera', 'Punta Arenas', 'Río Verde', 'San Gregorio', 'Timaukel', 'Torres del Paine'],
  },
]

export function FormularioRegistro() {
  const navigate = useNavigate()
  const [regionIndex, setRegionIndex] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [cargando, setCargando] = useState(false)
  const [registeredUser, setRegisteredUser] = useState<Record<string, string | null> | null>(null)

  const comunas = regionIndex === '' ? [] : regiones[Number(regionIndex)]?.comunas ?? []

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values = Object.fromEntries(data.entries()) as Record<string, string>

    const nextErrors: Record<string, string> = {}
    const requiredFields: Record<string, string> = {
      run: 'Ingresa tu RUN sin puntos ni guion.',
      nombre: 'Ingresa tu nombre.',
      apellido: 'Ingresa tus apellidos.',
      correo: 'Ingresa tu correo electrónico.',
      clave: 'Ingresa una contraseña (mínimo 8 caracteres).',
      region: 'Selecciona tu región.',
      comuna: 'Selecciona tu comuna.',
      direccion: 'Ingresa tu dirección.',
    }

    for (const [field, helpText] of Object.entries(requiredFields)) {
      if (!values[field]?.trim()) nextErrors[field] = helpText
    }
    if (values.run?.trim() && !/^[0-9]{7,8}[0-9Kk]$/.test(values.run.trim())) {
      nextErrors.run = 'Usa 8 o 9 caracteres, solo números y termina con dígito o K, sin puntos ni guion.'
    }
    if (values.nombre?.trim() && values.nombre.trim().length < 2) {
      nextErrors.nombre = 'El nombre debe tener al menos 2 caracteres.'
    }
    if (values.correo?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo.trim())) {
      nextErrors.correo = 'Revisa el formato. Ejemplo: nombre@correo.cl.'
    }
    if (values.clave && values.clave.length < 8) {
      nextErrors.clave = 'La contraseña debe tener al menos 8 caracteres.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setMessage('Revisa los campos marcados para continuar.')
      return
    }

    const nombreRegion = regiones[Number(values.region)]?.nombre ?? ''
    const payload = {
      run: values.run.trim().toUpperCase(),
      nombre: values.nombre.trim(),
      apellido: values.apellido.trim(),
      correo: values.correo.trim().toLowerCase(),
      clave: values.clave,
      fechaNacimiento: values.fechaNacimiento || null,
      region: nombreRegion,
      comuna: values.comuna.trim(),
      direccion: values.direccion.trim(),
    }

    try {
      setCargando(true)
      setMessage('')

      const respuesta = await fetch(`${API_USUARIOS}/auth/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!respuesta.ok) {
        const errorData = await respuesta.json().catch(() => null)
        setMessage(errorData?.message || 'No se pudo completar el registro. Verifica si el RUN o correo ya están registrados.')
        return
      }

      setRegisteredUser({ ...payload, region: nombreRegion })
      setMessage('¡Cuenta registrada en la base de datos! Redirigiendo al login...')
      form.reset()
      setRegionIndex('')
      setTimeout(() => navigate('/login'), 1800)
    } catch {
      setMessage('No se pudo conectar con usuarios-service (puerto 8081).')
    } finally {
      setCargando(false)
    }
  }

  const regionOptions = [
    { value: '', label: 'Seleccione una región' },
    ...regiones.map((region, index) => ({ value: String(index), label: region.nombre })),
  ]
  const comunaOptions = [
    { value: '', label: 'Seleccione una comuna' },
    ...comunas.map((comuna) => ({ value: comuna, label: comuna })),
  ]

  return (
    <div className="registration-layout">
      <TarjetaFormulario title="Crea tu cuenta">
        <p className="form-intro">Completa tus datos para registrarte como cliente en Sonido Vivo.</p>
        <form onSubmit={submit} noValidate>
          <CampoTexto label="RUN (sin puntos ni guion)" name="run" maxLength={9} error={errors.run} />
          <CampoTexto label="Nombre" name="nombre" maxLength={50} error={errors.nombre} />
          <CampoTexto label="Apellidos" name="apellido" maxLength={100} error={errors.apellido} />
          <CampoTexto label="Correo electrónico" name="correo" type="email" maxLength={100} error={errors.correo} />
          <CampoTexto label="Contraseña (mínimo 8 caracteres)" name="clave" type="password" maxLength={50} error={errors.clave} />
          <CampoTexto label="Fecha de nacimiento (opcional)" name="fechaNacimiento" type="date" />
          <Selector
            label="Región"
            name="region"
            value={regionIndex}
            onChange={setRegionIndex}
            error={errors.region}
            options={regionOptions}
          />
          <Selector label="Comuna" name="comuna" error={errors.comuna} options={comunaOptions} />
          <CampoTexto label="Dirección" name="direccion" maxLength={200} error={errors.direccion} />
          <p className={`form-message ${Object.keys(errors).length ? 'has-errors' : ''}`} role={Object.keys(errors).length ? 'alert' : 'status'} aria-live="polite">{message}</p>
          <Boton type="submit" disabled={cargando}>
            {cargando ? 'Registrando...' : 'Registrar mis datos'}
          </Boton>
        </form>
      </TarjetaFormulario>

      <aside className="profile-panel" aria-live="polite">
        <p className="eyebrow">PERFIL REGISTRADO</p>
        <h2>{registeredUser ? 'Datos guardados' : 'Tu perfil aparecerá aquí'}</h2>
        {registeredUser ? (
          <dl>
            <dt>Nombre</dt><dd>{[registeredUser.nombre, registeredUser.apellido].filter(Boolean).join(' ')}</dd>
            <dt>Correo</dt><dd>{registeredUser.correo}</dd>
            <dt>RUN</dt><dd>{registeredUser.run}</dd>
            <dt>Dirección</dt><dd>{registeredUser.direccion}, {registeredUser.comuna}</dd>
            <dt>Región</dt><dd>{registeredUser.region}</dd>
          </dl>
        ) : (
          <p>Al completar el formulario, tu cuenta quedará guardada en la base de datos y podrás iniciar sesión.</p>
        )}
      </aside>
    </div>
  )
}