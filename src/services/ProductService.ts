import axios from 'axios';

export interface Product {
    product_id?: number;
    product_name: string;
    product_status: number;
    category_name: string;
    category_id: number;
    product_price: number;
}

const API_URL = 'http://localhost:8080/api/products'; // replace with your API endpoint

export const getProducts = async () => {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
};

export const getProductById = async (id: number) => {
    const response = await axios.get<Product>(`${API_URL}/${id}`);
    return response.data;
};

export const createProduct = async (product: Product) => {
    const response = await axios.post<Product>(API_URL, product);
    return response.data;
};

export const updateProduct = async (id: number, product: Product) => {
    const response = await axios.put<Product>(`${API_URL}/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};