import React, { useEffect, useState } from "react";
import { listProduk, deleteProduk } from "../../services/ProdukService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ListProdukComponent() {
    const [produkData, setProdukData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

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
            title: "Yakin ingin menghapus data ini?",
            text: "Kamu tidak bisa mengulang kembali!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
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

    const getStatusBadge = (status) => {
        if (status === "Aktif") {
            return (
                <span className="badge rounded-pill bg-success">
                    <i className="bi bi-check-circle me-1"></i>Tersedia
                </span>
            );
        } else if (status === "NonAktif") {
            return (
                <span className="badge rounded-pill bg-danger">
                    <i className="bi bi-x-circle me-1"></i>Tidak Tersedia
                </span>
            );
        } else {
            return <span className="badge rounded-pill bg-secondary">{status}</span>;
        }
    };

    // Filter produk berdasarkan pencarian dan status
    const filteredProduk = produkData.filter((item) => {
        const matchSearch = item.nama_produk.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.jenis_produk.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === "all" || item.status === filterStatus;
        return matchSearch && matchStatus;
    });

    // Hitung statistik
    const totalProduk = produkData.length;
    const produkAktif = produkData.filter(p => p.status === "Aktif").length;
    const totalStok = produkData.reduce((sum, p) => sum + Number(p.stok), 0);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            {/* Header Section */}
            <div className="row mb-4">
                <div className="col">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="fw-bold mb-1">
                                <i className="bi bi-box-seam text-primary me-2"></i>
                                Manajemen Produk
                            </h2>
                            <p className="text-muted mb-0"> Kelola semua produk dalam sistem</p>
                        </div>
                        <Link to="/tambah-produk" className="btn btn-primary btn-lg shadow-sm">
                            <i className="bi bi-plus-circle me-2"></i>Tambah Produk
                        </Link>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                                        <i className="bi bi-box text-primary fs-3"></i>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="text-muted mb-1">Total Produk</h6>
                                    <h3 className="fw-bold mb-0">{totalProduk}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <div className="bg-success bg-opacity-10 rounded-3 p-3">
                                        <i className="bi bi-check-circle text-success fs-3"></i>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="text-muted mb-1">Produk Aktif</h6>
                                    <h3 className="fw-bold mb-0">{produkAktif}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <div className="bg-info bg-opacity-10 rounded-3 p-3">
                                        <i className="bi bi-stack text-info fs-3"></i>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="text-muted mb-1">Total Stok</h6>
                                    <h3 className="fw-bold mb-0">{totalStok.toLocaleString()}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
            )}

            {/* Table Card */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <div className="input-group">
                                <span className="input-group-text bg-light border-0">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light"
                                    placeholder="Cari produk atau jenis..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-md-end">
                                <select
                                    className="form-select w-auto"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="Aktif">Tersedia</option>
                                    <option value="NonAktif">Tidak Tersedia</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="text-center py-3 fw-semibold">ID</th>
                                    <th className="py-3 fw-semibold">Nama Produk</th>
                                    <th className="py-3 fw-semibold">Jenis Produk</th>
                                    <th className="text-center py-3 fw-semibold">Stok</th>
                                    <th className="text-end py-3 fw-semibold">Harga Beli</th>
                                    <th className="text-end py-3 fw-semibold">Harga Jual</th>
                                    <th className="text-center py-3 fw-semibold">Status</th>
                                    <th className="text-center py-3 fw-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProduk.length > 0 ? (
                                    filteredProduk.map((item) => (
                                        <tr key={item.id}>
                                            <td className="text-center">
                                                <span className="badge bg-light text-dark">{item.id}</span>
                                            </td>
                                            <td>
                                                <div className="fw-semibold">{item.nama_produk}</div>
                                            </td>
                                            <td>
                                                <span className="text-muted">{item.jenis_produk}</span>
                                            </td>
                                            <td className="text-center">
                                                <span className={`badge ${item.stok > 10 ? 'bg-success' : item.stok > 5 ? 'bg-warning' : 'bg-danger'} bg-opacity-10 text-dark`}>
                                                    {item.stok}
                                                </span>
                                            </td>
                                            <td className="text-end text-muted">
                                                {Number(item.harga_beli).toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}
                                            </td>
                                            <td className="text-end fw-semibold">
                                                {Number(item.harga_jual).toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}
                                            </td>
                                            <td className="text-center">{getStatusBadge(item.status)}</td>
                                            <td className="text-center">
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <Link
                                                        to={`/edit-produk/${item.id}`}
                                                        className="btn btn-sm btn-warning"
                                                    >
                                                        <i className="bi bi-pencil me-1"></i>Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        <i className="bi bi-trash me-1"></i>Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-5">
                                            <div className="text-muted">
                                                <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                                                <p className="mb-0">
                                                    {searchTerm || filterStatus !== "all"
                                                        ? "Tidak ada produk yang sesuai dengan pencarian"
                                                        : "Tidak ada produk ditemukan"}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {filteredProduk.length > 0 && (
                    <div className="card-footer bg-white border-top-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="text-muted mb-0">
                                Menampilkan {filteredProduk.length} dari {totalProduk} produk
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListProdukComponent;