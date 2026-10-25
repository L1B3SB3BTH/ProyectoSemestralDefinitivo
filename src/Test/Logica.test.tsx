import {test, expect} from "vitest";


//Comprobar que 2 + 3 es igual a 5 y verificar que vitest funciona correctamente
test("1. comprobar que 2 + 3 es igual a 5", () => {
  expect(2 + 3).toBe(5);
});

test("2. comprobar que el formateo de un precio incluye el signo peso", () => {
  const formatearPrecio = (precio: number) => `$${precio}`;
  expect(formatearPrecio(19990)).toBe("$19990");
});

test("3. comprobar que la validación de un correo devuelve falso si no tiene @", () => {
  const esCorreoValido = (correo: string) => correo.includes("@");
  expect(esCorreoValido("lauragmail.com")).toBe(false);
});

test("4. comprobar que la validación de correo devuelve verdadero si es correcto", () => {
  const esCorreoValido = (correo: string) => correo.includes("@");
  expect(esCorreoValido("laura@gmail.com")).toBe(true);
});