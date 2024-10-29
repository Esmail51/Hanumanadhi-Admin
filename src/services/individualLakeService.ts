import api from "./api";

export const getIndividualLakeData = async (lakeId: any) => {
  try {
    const response = await api.get(`/lake/${lakeId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch individual lake data:", error);
    throw error;
  }
};