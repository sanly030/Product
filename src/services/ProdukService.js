import axios from "axios";

const REST_API_BASE_URL = "https://api.roniprsty.com/produk/";

export const listProduk = () => axios.get(REST_API_BASE_URL + "read.php");
export const addProduk = (newProduct) => {
    return axios.post(REST_API_BASE_URL + "create.php", newProduct);
};

export const deleteProduk = (idProduct) => {
    return axios.delete(`${REST_API_BASE_URL}delete.php?id=${idProduct}`);
};

export const getProdutById = (idProduct) => {
    return axios.delete(`${REST_API_BASE_URL}detail.php?id=${idProduct}`);
};

export const updateProduk = (newProduct) => {
    return axios.put(REST_API_BASE_URL + "update.php", newProduct);
};