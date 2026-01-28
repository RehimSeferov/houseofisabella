import axios from "axios";

// Backend ünvanı
const BASE_URL = "http://localhost:5000"; // Əsas URL
const API_URL = `${BASE_URL}/api/products`;
const UPLOAD_URL = `${BASE_URL}/api/upload`; 

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const addProduct = async (productData: any) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file); 

  const response = await axios.post(UPLOAD_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateProduct = async (id: string, productData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data;
};
