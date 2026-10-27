import { esCorreoValido, formatearPrecio } from "../utilidades";

it("formatea un precio en pesos chilenos", () => {
  expect(formatearPrecio(19990)).toBe("$19.990");
});

it("rechaza un correo sin arroba", () => {
  expect(esCorreoValido("lauragmail.com")).toBe(false);
});

it("acepta un correo con formato válido", () => {
  expect(esCorreoValido("laura@gmail.com")).toBe(true);
});

it("rechaza un correo sin dominio", () => {
  expect(esCorreoValido("laura@" )).toBe(false);
});
