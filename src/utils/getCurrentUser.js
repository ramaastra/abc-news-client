import axios from 'axios';
import { getAuthToken } from './tokenHandler';

export default async function getCurrentUser() {
  const token = getAuthToken();
  if (!token) {
    return undefined;
  }

  const { data: response } = await axios.get('/auth/whoami', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}
