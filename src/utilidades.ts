// Formatea precios en pesos chilenos para reutilizar la misma regla en toda la tienda.
export function formatearPrecio(precio: number): string {
  return `$${precio.toLocaleString('es-CL')}`
}

// Valida un correo básico y tolera espacios al principio o al final.
export function esCorreoValido(correo: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
}

// --- GESTIÓN DE SESIÓN CON JWT EN LOCALSTORAGE ---
const SESSION_KEY = 'sonidoVivoSesion'

export type SesionUsuario = {
  token: string
  nombre: string
  correo: string
  rol: 'CLIENTE' | 'ADMINISTRADOR'
}

// Guarda el token JWT y los datos básicos recibidos desde el backend al iniciar sesión
export function guardarSesion(sesion: SesionUsuario): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sesion))
}

// Obtiene la sesión activa (para mantenerla al recargar la página)
export function obtenerSesion(): SesionUsuario | null {
  try {
    const sesion = localStorage.getItem(SESSION_KEY)
    if (!sesion) return null
    const parsed = JSON.parse(sesion) as SesionUsuario
    return parsed?.token ? parsed : null
  } catch {
    return null
  }
}

// Verifica si el usuario autenticado tiene rol de ADMINISTRADOR
export function esAdministrador(): boolean {
  const sesion = obtenerSesion()
  return sesion?.rol === 'ADMINISTRADOR'
}

// Devuelve los headers listos con el Bearer Token para peticiones protegidas (POST, PUT, DELETE)
export function obtenerAuthHeaders(): Record<string, string> {
  const sesion = obtenerSesion()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (sesion?.token) {
    headers['Authorization'] = `Bearer ${sesion.token}`
  }
  return headers
}

// Cierra la sesión eliminando el token de localStorage
export function cerrarSesion(): void {
  localStorage.removeItem(SESSION_KEY)
}

// --- COMPATIBILIDAD PARA Admin.tsx ---
export function obtenerSesionAdmin() {
  const sesion = obtenerSesion()
  if (sesion?.rol === 'ADMINISTRADOR') {
    return { autenticado: true, nombre: sesion.nombre, correo: sesion.correo }
  }
  return null
}

export function cerrarSesionAdmin(): void {
  cerrarSesion()
}

export function obtenerCuentaAdmin() {
  return { nombre: 'Administrador Sonido Vivo', correo: 'admin@sonidovivo.cl', clave: '' }
}

export function validarLoginAdmin(): boolean {
  return false
}