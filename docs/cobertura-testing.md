# Informe de cobertura de testing

## Ejecución

- Fecha de generación: 28 de octubre de 2026.
- Runner: Vitest 5, ejecutado en jsdom.
- Comandos: `npm test` para ejecutar las pruebas, `npm run test:watch` para modo interactivo y `npm run test:coverage` para generar cobertura.
- Resultado: 23 de 23 pruebas aprobadas en 6 archivos.
- Alcance medido: componentes de `src/componentes` y funciones de `src/utilidades.ts`.
- Instrumentación: proveedor V8 de Vitest; los archivos de prueba no se incluyen en el cálculo.

## Resultado global

| Métrica | Cubierto | Total | Cobertura |
| --- | ---: | ---: | ---: |
| Sentencias | 75 | 151 | 49,66 % |
| Ramas | 45 | 103 | 43,68 % |
| Funciones | 26 | 56 | 46,42 % |
| Líneas | 70 | 142 | 49,29 % |

## Archivos cubiertos

| Archivo | Sentencias | Ramas | Funciones | Líneas |
| --- | ---: | ---: | ---: | ---: |
| `src/utilidades.ts` | 100 % | 100 % | 100 % | 100 % |
| `src/componentes/atomos/Boton.tsx` | 100 % | 83,3 % | 100 % | 100 % |
| `src/componentes/atomos/Input.tsx` | 100 % | 100 % | 100 % | 100 % |
| `src/componentes/moleculas/CampoFormulario.tsx` | 100 % | 100 % | 100 % | 100 % |
| `src/componentes/moleculas/ItemSeleccion.tsx` | 33,3 % | 100 % | 33,3 % | 33,3 % |
| `src/componentes/moleculas/TarjetaFormulario.tsx` | 100 % | 100 % | 100 % | 100 % |
| `src/componentes/moleculas/TarjetaNoverdad.tsx` | 100 % | 100 % | 100 % | 100 % |
| `src/componentes/organismos/FormularioContacto.tsx` | 89,7 % | 87,5 % | 100 % | 97 % |
| `src/componentes/organismos/FormularioLogin.tsx` | 60,9 % | 50 % | 75 % | 60,9 % |
| `src/componentes/organismos/ListaNovedades.tsx` | 100 % | 100 % | 100 % | 100 % |
| `src/componentes/organismos/SeleccionProductos.tsx` | 100 % | 100 % | 100 % | 100 % |

## Archivos sin cobertura

Los siguientes 15 componentes aparecen con 0 % de cobertura, por lo que actualmente no tienen pruebas que los ejecuten:

- Átomos: `BotonLink.tsx`, `CampoTexto.tsx`, `EnlaceNav.tsx`, `Selector.tsx`.
- Moléculas: `TarjetaProducto.tsx`.
- Organismos: `ArticuloNovedad.tsx`, `ArticuloProducto.tsx`, `EquipoProyecto.tsx`, `FormularioRegistro.tsx`, `Navbar.tsx`, `PiePagina.tsx`, `PresentacionTienda.tsx`, `ProductosDestacados.tsx`, `seccionNosotros.tsx`, `VideosRecomendado.tsx`.

## Observaciones

- `ItemSeleccion.tsx` requiere pruebas de sus controles de cantidad y de actualización de unidades; solo se cubre parcialmente.
- `FormularioLogin.tsx` no tiene pruebas para campos vacíos, correo inválido ni contraseña corta, por eso mantiene cobertura parcial.
- `FormularioContacto.tsx` tiene pruebas de estado, validación y guardado válido; algunos caminos de las validaciones individuales aún no se ejecutan.
- 100 % de cobertura de un archivo indica ejecución de sus contadores instrumentados, no garantiza por sí sola ausencia de defectos.

## Reportes reproducibles

- Reporte HTML navegable: `coverage/html/index.html`.
- Datos JSON por archivo: `coverage/coverage-final.json`.
- Resumen de texto: salida del comando `npm test`.

Al ejecutar `npm run test:coverage`, Vitest vuelve a generar los reportes en la carpeta `coverage/`.