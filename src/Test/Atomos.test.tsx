//@vitest-environments jsdom
import { test, expect,vi } from "vitest";
import {render,screen,fireEvent} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import { Boton } from "../componentes/atomos/Boton";
import { Input } from "../componentes/atomos/Input";

test("5. el botón muestra el texto Enviar", () => {
  render(<Boton>Enviar</Boton>);
  const boton = screen.getByRole("button", { name: "Enviar" });
  expect(boton.textContent).toBe("Enviar");
});

test("6. el botón responde al hacer clic", () => {
  const funcionClic = vi.fn();
  render(<Boton onClick={funcionClic}>Guardar</Boton>);
  const boton = screen.getByRole("button", { name: "Guardar" });
  fireEvent.click(boton);
  expect(funcionClic).toHaveBeenCalledTimes(1);
});

test("7. el input muestra el placeholder correcto", () => {
  render(<Input placeholder="Ingrese su nombre" value="" onChange={() => {}} />);
  
  const elementoInput = screen.getByPlaceholderText("Ingrese su nombre");
  expect(elementoInput).not.toBeNull();
});

test("8. el input permite escribir texto", () => {
  const funcionCambio = vi.fn();
  render(<Input placeholder="Correo" value="" onChange={funcionCambio} />);
  
  const elementoInput = screen.getByPlaceholderText("Correo") as HTMLInputElement;
  fireEvent.change(elementoInput, { target: { value: "test@correo.com" } });
  
  expect(funcionCambio).toHaveBeenCalled();
});