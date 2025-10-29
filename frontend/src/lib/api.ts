import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});

export async function getHealth() {
  const { data } = await api.get('/actuator/health');
  return data; // { status: "UP" }
}
