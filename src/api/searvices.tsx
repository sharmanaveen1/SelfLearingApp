import axios from 'axios';
import { apiClient } from '../api/apiClient';

const API_KEY = 'pub_fe8069f0cdc7470b953d3c713150e181';

export const getNews = async (country: string, category: string) => {
  try {
    const response = await apiClient.get('/latest', {
      params: {
        apikey: API_KEY,
        country,
        category,
        datatype: 'news',
        size: 10,
      },
    });

      // 🔥 IMPORTANT: Handle API error manually
    if (response.data.status === 'error') {
      throw new Error(response.data?.results?.message || 'API Error');
    }


    // Handle API-level errors (if backend sends status flag)
    if (!response.data || response.data.status !== 'success') {
      throw new Error(response.data?.message || 'Failed to fetch news');
    }
  
    return response.data;
  } catch (error: any) {
    // Axios error handling
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.statusText ||
        'Network error';

      throw new Error(message);
    }

    throw new Error('Something went wrong');
  }
};
