// Função para definir um valor no localStorage
export const setLocalStorage = (name: string, value: string): void => {
  localStorage.setItem(name, value);
};

// Função para obter o valor do localStorage
export const getLocalStorage = (name: string): string | null => {
  return localStorage.getItem(name);
};

// Função para remover um item do localStorage
export const removeLocalStorage = (name: string): void => {
  localStorage.removeItem(name);
};

// Função para armazenar um Bearer Token no localStorage
export const setBearerTokenLocalStorage = (token: string): void => {
  setLocalStorage("@bearerToken", token);
};

// Função para obter o Bearer Token do localStorage
export const getBearerTokenLocalStorage = (): string | null => {
  return getLocalStorage("@bearerToken");
};

// Função para remover o Bearer Token do localStorage
export const removeBearerTokenLocalStorage = (): void => {
  removeLocalStorage("@bearerToken");
};
