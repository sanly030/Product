import React, { useEffect, useState } from 'react';
import { listProduk } from '../../services/ProdukService';

function ListProdukComponent() {
    const [produkData, setProdukData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduk = async () => {
            try {
                const response = await listProduk();
                setProdukData(response.data);
            } catch (error) {
                console.error("Error fetching produk data:", error);
                setError("Gagal mengambil data produk.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduk();
    }, []);

    if (loading) {
        return <div className="text-center mt-5"><h4>Loading...</h4></div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">List Produk</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Produk</th>
                        <th>Jenis Produk</th>
                        <th>Stok</th>
                        <th>Harga Beli</th>
                        <th>Harga Jual</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {produkData.length > 0 ? (
                        produkData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nama_produk}</td>
                                <td>{item.jenis_produk}</td>
                                <td>{item.stok}</td>
                                <td>{item.harga_beli.toLocaleString()} IDR</td>
                                <td>{item.harga_jual.toLocaleString()} IDR</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">Tidak ada produk ditemukan.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListProdukComponent;
