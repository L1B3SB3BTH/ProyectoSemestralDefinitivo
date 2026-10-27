// Formatea precios en pesos chilenos para reutilizar la misma regla en toda la tienda.
export function formatearPrecio(precio: number): string {
  return `$${precio.toLocaleString('es-CL')}`
}

// Valida un correo básico y tolera espacios al principio o al final.
export function esCorreoValido(correo: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
}