import { cleanup, render, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ListaNovedades } from "../componentes/organismos/ListaNovedades";
import { TarjetaNovedad } from "../componentes/moleculas/TarjetaNoverdad";

afterEach(cleanup);

const novedades = [
  {
    id: "audio-portatil",
    title: "Audio para llevar",
    image: "/audio-portatil.jpg",
    summary: "Equipos compactos para cualquier lugar.",
    paragraphs: [],
  },
  {
    id: "torres-sonido",
    title: "Nuevas torres de sonido",
    image: "/torres-sonido.jpg",
    summary: "Más potencia para tus reuniones.",
    paragraphs: [],
  },
  {
    id: "consejos-audio",
    title: "Consejos para cuidar tu equipo",
    image: "/consejos-audio.jpg",
    summary: "Pequeños cuidados que prolongan su vida útil.",
    paragraphs: [],
  },
];

function renderListaNovedades() {
  return render(
    <MemoryRouter>
      <ListaNovedades novedades={novedades} />
    </MemoryRouter>,
  );
}

it("6. la lista renderiza todos los elementos recibidos", () => {
  const { container } = renderListaNovedades();
  expect(container.querySelectorAll(".news-card").length).toBe(novedades.length);
});

it("7. cada elemento de la lista muestra su título y contenido", () => {
  const { container } = renderListaNovedades();
  const articulos = container.querySelectorAll(".news-card");

  novedades.forEach((novedad, index) => {
    const articulo = within(articulos[index] as HTMLElement);
    expect(articulo.getByRole("heading", { level: 3, name: novedad.title })).toBeTruthy();
    expect(articulo.getByText(novedad.summary)).toBeTruthy();
    expect(articulo.getByRole("link", { name: "Leer más" }).getAttribute("href")).toBe(
      `/novedades/${novedad.id}`,
    );
  });
});

it("8. la tarjeta de novedad renderiza los datos recibidos", () => {
  const novedad = novedades[0];
  const { container } = render(
    <MemoryRouter>
      <TarjetaNovedad item={novedad} />
    </MemoryRouter>,
  );
  const tarjeta = within(container);

  expect(tarjeta.getByRole("heading", { level: 3, name: novedad.title })).toBeTruthy();
  expect(tarjeta.getByRole("img", { name: novedad.title }).getAttribute("src")).toBe(novedad.image);
  expect(tarjeta.getByText(novedad.summary)).toBeTruthy();
  expect(tarjeta.getByRole("link", { name: "Leer más" }).getAttribute("href")).toBe(
    `/novedades/${novedad.id}`,
  );
});