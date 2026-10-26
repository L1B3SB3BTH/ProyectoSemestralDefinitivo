import {test, expect} from "vitest";
import { esCorreoValido, formatearPrecio } from "../utilidades";

//Comprobar que 2 + 3 es igual a 5 y verificar que vitest funciona correctamente
test("1. comprobar que 2 + 3 es igual a 5", () => {
  expect(2 + 3).toBe(5);
});

test("2. comprobar que el formateo de un precio incluye el signo peso", () => {
  expect(formatearPrecio(19990)).toBe("$19.990");
});

test("3. comprobar que la validación de un correo devuelve falso si no tiene @", () => {
  expect(esCorreoValido("lauragmail.com")).toBe(false);
});

test("4. comprobar que la validación de correo devuelve verdadero si es correcto", () => {
  expect(esCorreoValido("laura@gmail.com")).toBe(true);
});