export function formatearPrecio(precio: number): string {
  return `$${precio.toLocaleString('es-CL')}`
}

export function esCorreoValido(correo: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
}