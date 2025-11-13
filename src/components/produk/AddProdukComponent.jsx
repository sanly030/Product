import React, { useEffect, useState } from "react";
import {
    addProduk,
    getProdutById,
    updateProduk,
} from "../../services/ProdukService";
import { Link, useParams } from "react-router-dom";

function AddProdukComponent() {
    const [namaProduk, setNamaProduk] = useState("");
    const [jenisProduk, setJenisProduk] = useState("");
    const [stok, setStok] = useState("");
    const [hargaBeli, setHargaBeli] = useState("");
    const [hargaJual, setHargaJual] = useState("");
    const [status, setStatus] = useState("Aktif");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchProduk = async () => {
                try {
                    const response = await getProdutById(id);
                    const data = response.data;

                    setNamaProduk(data.nama_produk);
                    setJenisProduk(data.jenis_produk);
                    setStok(data.stok);
                    setHargaBeli(data.harga_beli);
                    setHargaJual(data.harga_jual);
                    setStatus(data.status);
                } catch (error) {
                    console.error("Error fetching produk data: ", error);
                    setError("Gagal mengambil data produk.");
                }
            };

            fetchProduk();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            if (id) {
                const newProduct = {
                    id: id,
                    nama_produk: namaProduk,
                    jenis_produk: jenisProduk,
                    stok: stok,
                    harga_beli: hargaBeli,
                    harga_jual: hargaJual,
                    status: status,
                };

                await updateProduk(newProduct);
                setSuccessMessage("Produk berhasil diubah!");
                setNamaProduk("");
                setJenisProduk("");
                setStok("");
                setHargaBeli("");
                setHargaJual("");
                setStatus("");
            }
            else {
                const newProduct = {
                    nama_produk: namaProduk,
                    jenis_produk: jenisProduk,
                    stok: stok,
                    harga_beli: hargaBeli,
                    harga_jual: hargaJual,
                    status: status,
                };

                await addProduk(newProduct);
                setSuccessMessage("Produk berhasil ditambahkan!");
                setNamaProduk("");
                setJenisProduk("");
                setStok("");
                setHargaBeli("");
                setHargaJual("");
                setStatus("Aktif");
            }
            
        } catch (error) {
            console.error("Error adding product:", error);
            setError("Gagal menyimpan produk. Silahkan coba lagi.");
        }
    };

    return (
        <div className="container mt-4">
            {id ? <h2>Ubah Produk</h2> : <h2>Tambah Produk</h2>}
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaProduk" className="form-label">
                        Nama Produk
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="namaProduk"
                        value={namaProduk}
                        onChange={(e) => setNamaProduk(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="jenisProduk" className="form-label">
                        Jenis Produk
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="jenisProduk"
                        value={jenisProduk}
                        onChange={(e) => setJenisProduk(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="stok" className="form-label">
                        Stok
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="stok"
                        value={stok}
                        onChange={(e) => setStok(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="hargaBeli" className="form-label">
                        Harga Beli
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="hargaBeli"
                        value={hargaBeli}
                        onChange={(e) => setHargaBeli(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="hargaJual" className="form-label">
                        Harga Jual
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="hargaJual"
                        value={hargaJual}
                        onChange={(e) => setHargaJual(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>
                    <select
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Aktif">Tersedia</option>
                        <option value="Non-Aktif">Tidak Tersedia</option>
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">
                    {id ? "Ubah Produk" : "Tambah Produk"}
                </button>
                <Link to="/list-produk" className="btn btn-secondary ms-2">
                    Kembali ke List Produk
                </Link>
            </form>
        </div>
    );
}

export default AddProdukComponent;
