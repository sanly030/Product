import axios from 'axios';

const REST_API_BASE_URL = 'https://api.roniprsty.com/produk/';

export const listProduk = () => axios.get(REST_API_BASE_URL + "read.php");
