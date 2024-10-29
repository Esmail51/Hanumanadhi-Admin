import api from './api';

export const getDashboardData = async (page:number,limit:number) => {
  try {
    const response = await api.get('/data?page='+page+'&limit='+limit);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw error;
  }
};

