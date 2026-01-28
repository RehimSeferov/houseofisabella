import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const response = await axios.put(`${API_URL}/${id}`, { status });
  return response.data;
};

export const deleteOrder = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
