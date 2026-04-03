const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const registerUser = async (data: any) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const loginUser = async (data: any) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const saveSession = async (data: any) => {
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify(data),
  });
};