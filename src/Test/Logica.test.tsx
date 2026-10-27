import {test, expect} from "vitest";
import { esCorreoValido, formatearPrecio } from "../utilidades";

// Comprobar una operación básica para confirmar que Vitest ejecuta el archivo.
test("1. comprobar que 2 + 3 es igual a 5", () => {
  expect(2 + 3).toBe(5);
});

test("2. comprobar el formato de un precio en pesos chilenos", () => {
  expect(formatearPrecio(19990)).toBe("$19.990");
});

test("3. rechazar un correo sin arroba", () => {
  expect(esCorreoValido("lauragmail.com")).toBe(false);
});

test("4. aceptar un correo con formato válido", () => {
  expect(esCorreoValido("laura@gmail.com")).toBe(true);
});
