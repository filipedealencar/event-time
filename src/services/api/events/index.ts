import { getLocalStorage } from "../../../data/storageUtil";
import { DataLogin, DataRegister, EventData, EventRequest } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export async function isValidToken(token: string): Promise<any> {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${apiUrl}/verify-token`, requestOptions);

    if (!response.ok) {
      throw new Error(`Erro na requisição GET: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
export async function userLogin(data: DataLogin): Promise<any> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Converte os dados para JSON e os envia no corpo da requisição
  };
  try {
    const response = await fetch(`${apiUrl}/login`, requestOptions);

    if (!response.ok) {
      throw new Error(`Erro na requisição GET: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
export async function userRegister(data: DataRegister): Promise<EventRequest> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${apiUrl}/register`, requestOptions);

    // setBearerTokenCookie

    if (!response.ok) {
      throw new Error(`Erro na requisição GET: ${response.statusText}`);
    }

    const data: EventRequest = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getEvent(token: string): Promise<any> {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${apiUrl}/`, requestOptions);

    if (!response.ok) {
      throw new Error(`Erro na requisição GET: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createEvent(data: EventData): Promise<any> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLocalStorage("@bearerToken")}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${apiUrl}/`, requestOptions);

    if (!response.ok) {
      throw new Error(`Erro na requisição GET: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
export async function updateEvent(id: string, data: EventData): Promise<any> {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLocalStorage("@bearerToken")}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${apiUrl}/${id}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Erro na requisição GET: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
export async function deleteEvent(id: string): Promise<any> {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLocalStorage("@bearerToken")}`,
    },
  };
  try {
    const response = await fetch(`${apiUrl}/${id}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Erro na requisição GET: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
