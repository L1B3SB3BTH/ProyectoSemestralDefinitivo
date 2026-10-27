import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Boton } from "../componentes/atomos/Boton";
import { Input } from "../componentes/atomos/Input";

afterEach(cleanup);

it("1. renderiza un botón", () => {
  render(<Boton>Enviar</Boton>);
  expect(screen.getByRole("button")).toBeTruthy();
});

it("2. muestra la etiqueta recibida por el botón", () => {
  render(<Boton>Enviar</Boton>);
  expect(screen.getByRole("button").textContent).toBe("Enviar");
});

it("3. ejecuta onClick al hacer clic en el botón", () => {
  const funcionClic = jasmine.createSpy("funcionClic");
  render(<Boton onClick={funcionClic}>Guardar</Boton>);
  const boton = screen.getByRole("button", { name: "Guardar" });
  fireEvent.click(boton);
  expect(funcionClic).toHaveBeenCalledTimes(1);
});

it("4. renderiza un campo de texto", () => {
  const { container } = render(<Input tipo="text" nombre="nombre" valor="" alCambiar={() => {}} />);
  expect(container.querySelector("input")).toBeTruthy();
});

it("5. entrega al input los props recibidos", () => {
  const funcionCambio = jasmine.createSpy("funcionCambio");
  const { container } = render(
    <Input tipo="email" nombre="correo" valor="laura@gmail.com" alCambiar={funcionCambio} maxLength={100} />,
  );
  const elementoInput = container.querySelector("input") as HTMLInputElement;

  expect(elementoInput.type).toBe("email");
  expect(elementoInput.name).toBe("correo");
  expect(elementoInput.value).toBe("laura@gmail.com");
  expect(elementoInput.maxLength).toBe(100);
  fireEvent.change(elementoInput, { target: { value: "otro@correo.com" } });
  expect(funcionCambio).toHaveBeenCalledWith("otro@correo.com");
});