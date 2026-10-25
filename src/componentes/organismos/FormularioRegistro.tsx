import { useState, type FormEvent } from 'react'
import { Boton } from '../atomos/Boton'
import { Selector } from '../atomos/Selector'
import { CampoTexto } from '../atomos/CampoTexto'
import { TarjetaFormulario } from '../moleculas/TarjetaFormulario'

const regiones: { nombre: string; comunas: string[] }[] = [
  {
    "nombre": "Arica y Parinacota",
    "comunas": [
      "Arica",
      "Camarones",
      "General Lagos",
      "Putre"
    ]
  },
  {
    "nombre": "Tarapacá",
    "comunas": [
      "Alto Hospicio",
      "Camiña",
      "Colchane",
      "Huara",
      "Iquique",
      "Pica",
      "Pozo Almonte"
    ]
  },
  {
    "nombre": "Antofagasta",
    "comunas": [
      "Antofagasta",
      "Calama",
      "María Elena",
      "Mejillones",
      "Ollagüe",
      "San Pedro de Atacama",
      "Sierra Gorda",
      "Taltal",
      "Tocopilla"
    ]
  },
  {
    "nombre": "Atacama",
    "comunas": [
      "Alto del Carmen",
      "Caldera",
      "Chañaral",
      "Copiapó",
      "Diego de Almagro",
      "Freirina",
      "Huasco",
      "Tierra Amarilla",
      "Vallenar"
    ]
  },
  {
    "nombre": "Coquimbo",
    "comunas": [
      "Andacollo",
      "Canela",
      "Combarbalá",
      "Coquimbo",
      "Illapel",
      "La Higuera",
      "La Serena",
      "Los Vilos",
      "Monte Patria",
      "Ovalle",
      "Paiguano",
      "Punitaqui",
      "Río Hurtado",
      "Salamanca",
      "Vicuña"
    ]
  },
  {
    "nombre": "Valparaíso",
    "comunas": [
      "Algarrobo",
      "Cabildo",
      "Calera",
      "Cartagena",
      "Casablanca",
      "Catemu",
      "Concón",
      "El Quisco",
      "El Tabo",
      "Hijuelas",
      "Isla de Pascua",
      "Juan Fernández",
      "La Cruz",
      "La Ligua",
      "Limache",
      "Llay-Llay",
      "Los Andes",
      "Nogales",
      "Olmué",
      "Panquehue",
      "Papudo",
      "Petorca",
      "Puchuncaví",
      "Putaendo",
      "Quillota",
      "Quilpué",
      "Quintero",
      "Rinconada",
      "San Antonio",
      "San Esteban",
      "San Felipe",
      "Santa María",
      "Santo Domingo",
      "Valparaíso",
      "Villa Alemana",
      "Viña del Mar",
      "Zapallar"
    ]
  },
  {
    "nombre": "Región Metropolitana de Santiago",
    "comunas": [
      "Alhué",
      "Buin",
      "Calera de Tango",
      "Cerrillos",
      "Cerro Navia",
      "Colina",
      "Conchalí",
      "Curacaví",
      "El Bosque",
      "El Monte",
      "Estación Central",
      "Huechuraba",
      "Independencia",
      "Isla de Maipo",
      "La Cisterna",
      "La Florida",
      "La Granja",
      "La Pintana",
      "La Reina",
      "Lampa",
      "Las Condes",
      "Lo Barnechea",
      "Lo Espejo",
      "Lo Prado",
      "Macul",
      "Maipú",
      "María Pinto",
      "Melipilla",
      "Ñuñoa",
      "Padre Hurtado",
      "Paine",
      "Pedro Aguirre Cerda",
      "Peñaflor",
      "Peñalolén",
      "Pirque",
      "Providencia",
      "Pudahuel",
      "Puente Alto",
      "Quilicura",
      "Quinta Normal",
      "Recoleta",
      "Renca",
      "San Bernardo",
      "San Joaquín",
      "San José de Maipo",
      "San Miguel",
      "San Pedro",
      "San Ramón",
      "Santiago",
      "Talagante",
      "Tiltil",
      "Vitacura"
    ]
  },
  {
    "nombre": "O'Higgins",
    "comunas": [
      "Codegua",
      "Coinco",
      "Coltauco",
      "Doñihue",
      "Graneros",
      "La Estrella",
      "Las Cabras",
      "Litueche",
      "Lolol",
      "Machalí",
      "Malloa",
      "Marchigüe",
      "Mostazal",
      "Nancagua",
      "Navidad",
      "Olivar",
      "Palmilla",
      "Paredones",
      "Peralillo",
      "Peumo",
      "Pichidegua",
      "Pichilemu",
      "Placilla",
      "Pumanque",
      "Quinta de Tilcoco",
      "Rancagua",
      "Rengo",
      "Requínoa",
      "San Fernando",
      "San Francisco de Mostazal",
      "San Vicente"
    ]
  },
  {
    "nombre": "Maule",
    "comunas": [
      "Cauquenes",
      "Chanco",
      "Colbún",
      "Constitución",
      "Curepto",
      "Curicó",
      "Empedrado",
      "Hualañé",
      "Licantén",
      "Linares",
      "Longaví",
      "Maule",
      "Molina",
      "Parral",
      "Pelarco",
      "Pelluhue",
      "Pencahue",
      "Rauco",
      "Retiro",
      "Río Claro",
      "Romeral",
      "Sagrada Familia",
      "San Clemente",
      "San Javier",
      "San Rafael",
      "Talca",
      "Teno",
      "Vichuquén",
      "Villa Alegre",
      "Yerbas Buenas"
    ]
  },
  {
    "nombre": "Ñuble",
    "comunas": [
      "Bulnes",
      "Chillán",
      "Chillán Viejo",
      "Cobquecura",
      "Coelemu",
      "Coihueco",
      "El Carmen",
      "Ninhue",
      "Ñiquén",
      "Pemuco",
      "Pinto",
      "Portezuelo",
      "Quillón",
      "Quirihue",
      "Ránquil",
      "San Carlos",
      "San Fabián",
      "San Ignacio",
      "San Nicolás",
      "Treguaco",
      "Yungay"
    ]
  },
  {
    "nombre": "Biobío",
    "comunas": [
      "Alto Biobío",
      "Antuco",
      "Arauco",
      "Cabrero",
      "Cañete",
      "Chiguayante",
      "Concepción",
      "Contulmo",
      "Curanilahue",
      "Florida",
      "Hualpén",
      "Hualqui",
      "Laja",
      "Lebu",
      "Los Álamos",
      "Los Ángeles",
      "Lota",
      "Mulchén",
      "Nacimiento",
      "Negrete",
      "Penco",
      "Quilaco",
      "Quilleco",
      "San Pedro de la Paz",
      "San Rosendo",
      "Santa Bárbara",
      "Santa Juana",
      "Talcahuano",
      "Tirúa",
      "Tomé",
      "Tucapel",
      "Yumbel"
    ]
  },
  {
    "nombre": "La Araucanía",
    "comunas": [
      "Angol",
      "Carahue",
      "Cholchol",
      "Collipulli",
      "Cunco",
      "Curacautín",
      "Curarrehue",
      "Ercilla",
      "Freire",
      "Galvarino",
      "Gorbea",
      "Lautaro",
      "Loncoche",
      "Lonquimay",
      "Los Sauces",
      "Lumaco",
      "Melipeuco",
      "Nueva Imperial",
      "Padre Las Casas",
      "Perquenco",
      "Pitrufquén",
      "Pucón",
      "Purén",
      "Renaico",
      "Saavedra",
      "Temuco",
      "Teodoro Schmidt",
      "Toltén",
      "Traiguén",
      "Victoria",
      "Vilcún",
      "Villarrica"
    ]
  },
  {
    "nombre": "Los Ríos",
    "comunas": [
      "Corral",
      "Futrono",
      "La Unión",
      "Lago Ranco",
      "Lanco",
      "Los Lagos",
      "Máfil",
      "Mariquina",
      "Paillaco",
      "Panguipulli",
      "Río Bueno",
      "Valdivia"
    ]
  },
  {
    "nombre": "Los Lagos",
    "comunas": [
      "Ancud",
      "Calbuco",
      "Castro",
      "Chaitén",
      "Chonchi",
      "Cochamó",
      "Curaco de Vélez",
      "Dalcahue",
      "Fresia",
      "Frutillar",
      "Futaleufú",
      "Hualaihué",
      "Llanquihue",
      "Los Muermos",
      "Maullín",
      "Osorno",
      "Palena",
      "Puerto Montt",
      "Puerto Octay",
      "Puerto Varas",
      "Puqueldón",
      "Purranque",
      "Puyehue",
      "Queilén",
      "Quellón",
      "Quemchi",
      "Quinchao",
      "Río Negro",
      "San Juan de la Costa",
      "San Pablo"
    ]
  },
  {
    "nombre": "Aysén",
    "comunas": [
      "Aysén",
      "Chile Chico",
      "Cisnes",
      "Cochrane",
      "Coyhaique",
      "Guaitecas",
      "Lago Verde",
      "O'Higgins",
      "Río Ibáñez"
    ]
  },
  {
    "nombre": "Magallanes y de la Antártica Chilena",
    "comunas": [
      "Antártica",
      "Cabo de Hornos",
      "Laguna Blanca",
      "Natales",
      "Porvenir",
      "Primavera",
      "Punta Arenas",
      "Río Verde",
      "San Gregorio",
      "Timaukel",
      "Torres del Paine"
    ]
  }
]

export function FormularioRegistro() {
  const [regionIndex, setRegionIndex] = useState('')
  const [message, setMessage] = useState('')
  const comunas = regionIndex === '' ? [] : regiones[Number(regionIndex)]?.comunas ?? []

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const run = String(data.get('run') || '').trim()
    const required = ['nombre', 'apellido', 'correo', 'tipoUsuario', 'region', 'comuna', 'direccion']
      .some((key) => !String(data.get(key) || '').trim())

    if (required) return setMessage('Falta completar uno o más campos obligatorios.')
    if (!/^[0-9]+[0-9Kk]$/.test(run)) return setMessage('El RUN ingresado no es válido.')

    setMessage('Usuario registrado correctamente.')
    event.currentTarget.reset()
    setRegionIndex('')
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
    <TarjetaFormulario title="Registro de Usuario">
      <form onSubmit={submit}>
        <CampoTexto label="RUN (sin puntos ni guion):" name="run" maxLength={9} />
        <CampoTexto label="Nombre:" name="nombre" maxLength={50} />
        <CampoTexto label="Apellidos:" name="apellido" maxLength={100} />
        <CampoTexto label="Correo electrónico:" name="correo" type="email" maxLength={100} />
        <CampoTexto label="Fecha de nacimiento (opcional):" name="fechaNacimiento" type="date" />
        <Selector
          label="Tipo de usuario:"
          name="tipoUsuario"
          options={[
            { value: '', label: 'Seleccione un tipo' },
            { value: 'cliente', label: 'Cliente' },
            { value: 'administrador', label: 'Administrador' },
          ]}
        />
        <Selector
          label="Región:"
          name="region"
          value={regionIndex}
          onChange={setRegionIndex}
          options={regionOptions}
        />
        <Selector label="Comuna:" name="comuna" options={comunaOptions} />
        <CampoTexto label="Dirección:" name="direccion" maxLength={300} />
        <p className="form-message" aria-live="polite">{message}</p>
        <Boton type="submit">Registrar</Boton>
      </form>
    </TarjetaFormulario>
  )
}
