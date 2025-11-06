import React, { useEffect, useState } from "react";
import { listProduk, deleteProduk } from "../../services/ProdukService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ListProdukComponent() {
    const [produkData, setProdukData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduk = async () => {
            try {
                const response = await listProduk();
                setProdukData(response.data);
            } catch (error) {
                console.error("Error fetching produk data: ", error);
                setError("Gagal mengambil data produk.");
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchProduk();
    }, []);

    const handleDelete = async (idProduct) => {
        Swal.fire({
            title: "Ayakin ingin menghapus data ini ?",
            text: "Kamu tidak bisa mengulang kembali!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteProduk(idProduct);
                    Swal.fire({
                        title: "Terhapus!",
                        text: "Data telah berhasil dihapus.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });

                    fetchProduk();
                } catch (error) {
                    console.error("Gagal menghapus produk:", error);
                    Swal.fire({
                        title: "Gagal!",
                        text: "Terjadi kesalahan saat menghapus produk.",
                        icon: "error",
                    });
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <h4>Loading...</h4>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">List Produk</h2>
            <Link to="/tambah-produk" className="btn btn-primary mb-3">
                Add Produk
            </Link>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Nama Produk</th>
                        <th className="text-center">Jenis Produk</th>
                        <th className="text-center">Stok</th>
                        <th className="text-center">Harga Beli</th>
                        <th className="text-center">Harga Jual</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {produkData.length > 0 ? (
                        produkData.map((item) => (
                            <tr key={item.id}>
                                <td className="text-end">{item.id}</td>
                                <td>{item.nama_produk}</td>
                                <td>{item.jenis_produk}</td>
                                <td className="text-end">{item.stok}</td>
                                <td className="text-end">
                                    {Number(item.harga_beli).toLocaleString(
                                        "id-ID",
                                        { style: "currency", currency: "IDR" }
                                    )}{" "}
                                    IDR
                                </td>
                                <td className="text-end">
                                    {Number(item.harga_jual).toLocaleString(
                                        "id-ID",
                                        { style: "currency", currency: "IDR" }
                                    )}{" "}
                                    IDR
                                </td>
                                <td className="text-center">{item.status}</td>
                                <td className="text-center">
                                    <Link
                                        to={`/edit-produk/${item.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                Tidak ada produk ditemukan.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListProdukComponent;
