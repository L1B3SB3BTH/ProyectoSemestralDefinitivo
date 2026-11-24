import { EquipoProyecto } from '../componentes/organismos/EquipoProyecto'
import { SeccionNosotros } from '../componentes/organismos/seccionNosotros'
import { VideoRecomendado } from '../componentes/organismos/VideosRecomendado'

export function Nosotros() {
  return (
    <main className="page">
      <SeccionNosotros />
      <EquipoProyecto />
      <VideoRecomendado />
    </main>
  )
}
