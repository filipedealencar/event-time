import Cookies from "js-cookie";

const COOKIE_EXPIRATION_DAYS = 7; // Período de expiração desejado em dias

// Função para definir um cookie
export const setCookie = (name: string, value: string): void => {
  Cookies.set(name, value, { expires: COOKIE_EXPIRATION_DAYS });
};

// Função para obter o valor de um cookie
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

// Função para excluir um cookie
export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};

// Função para armazenar um Bearer Token em um cookie
export const setBearerTokenCookie = (token: string): void => {
  setCookie("bearerToken", token);
};

// Função para obter o Bearer Token de um cookie
export const getBearerTokenCookie = (): string | undefined => {
  return getCookie("bearerToken");
};

// Função para remover o Bearer Token de um cookie
export const removeBearerTokenCookie = (): void => {
  removeCookie("bearerToken");
};
