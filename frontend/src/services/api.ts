// Use relative path in production, full URL in development
const BASE_URL = import.meta.env.PROD 
  ? '/api'  // In production, requests go to same origin
  : 'http://localhost:5000/api';

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