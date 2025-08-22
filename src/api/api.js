// import axios from 'axios';

// axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

// export const fetchAllProducts = async (params = {}) => {
//   console.log({params});
//   const response = await axios.get('/campers', {params});
//   return response.data;
// };

// export const fetchProductById = async (id) => {
//   const response = await axios.get(`/campers/${id}`);
//   return response.data;
// };

import axios from 'axios';

const API = axios.create({
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
});

export const fetchAllProducts = async (params = {}) => {
  try {
    console.log('API Request Params:', params);
    const response = await API.get('/campers', { params });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Fetch All Products Error:', error.response?.status, error.response?.data);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await API.get(`/campers/${id}`);
    console.log('API Response for ID:', id, response.data);
    return response.data;
  } catch (error) {
    console.error('Fetch Product By ID Error:', error.response?.status, error.response?.data);
    throw error;
  }
};

export default API; // Додаємо дефолтний експорт