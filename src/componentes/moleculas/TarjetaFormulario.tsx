import type { ReactNode } from 'react'

type FormCardProps = { title: string; children: ReactNode }

export function TarjetaFormulario({ title, children }: FormCardProps) {
  return <section className="form-card"><h2>{title}</h2>{children}</section>
}
