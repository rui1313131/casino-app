import axios from 'axios';
import { supabase } from './supabaseClient';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

async function handleBetAction(amount: number, roomId: number) {
  try {
    const response = await apiClient.post('/game/bet', {
      roomId: roomId,
      betAmount: amount,
    });
    console.log('Bet successful:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Bet failed:', error.response?.data.message || error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}
