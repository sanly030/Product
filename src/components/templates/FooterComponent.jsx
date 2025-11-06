import React from "react";
import { Link } from "react-router-dom";

function FooterComponent() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white mt-auto">
            {/* Main Footer */}
            <div className="container py-5">
                <div className="row g-4">
                    {/* About Section */}
                    <div className="col-lg-4 col-md-6">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-primary bg-gradient rounded-3 p-2 me-2">
                                <i className="bi bi-shop text-white fs-4"></i>
                            </div>
                            <h5 className="mb-0 fw-bold">Toko Informatika</h5>
                        </div>
                        <p className="text-white-50 mb-3">
                            Solusi terpercaya untuk semua kebutuhan produk informatika Anda. 
                            Kualitas terbaik dengan harga terjangkau.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle" style={{width: '40px', height: '40px', padding: '0', lineHeight: '40px'}}>
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle" style={{width: '40px', height: '40px', padding: '0', lineHeight: '40px'}}>
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle" style={{width: '40px', height: '40px', padding: '0', lineHeight: '40px'}}>
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle" style={{width: '40px', height: '40px', padding: '0', lineHeight: '40px'}}>
                                <i className="bi bi-linkedin"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h6 className="text-uppercase fw-bold mb-3">Menu</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-white-50 text-decoration-none hover-link">
                                    <i className="bi bi-chevron-right me-1"></i>Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/list-produk" className="text-white-50 text-decoration-none hover-link">
                                    <i className="bi bi-chevron-right me-1"></i>Produk
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about" className="text-white-50 text-decoration-none hover-link">
                                    <i className="bi bi-chevron-right me-1"></i>Tentang
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact" className="text-white-50 text-decoration-none hover-link">
                                    <i className="bi bi-chevron-right me-1"></i>Kontak
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-lg-3 col-md-6">
                        <h6 className="text-uppercase fw-bold mb-3">Support</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-white-50 text-decoration-none hover-link">
                                    <i className="bi bi-chevron-right me-1"></i>FAQ
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white-50 text-decoration-none hover-link">
                                    <i className="bi bi-chevron-right me-1"></i>Kebijakan Privasi
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white-50 text-decoration-none hover-link">
                                    <i className="bi bi-chevron-right me-1"></i>Syarat & Ketentuan
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white-50 text-decoration-none hover-link">
                                    <i className="bi bi-chevron-right me-1"></i>Bantuan
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-lg-3 col-md-6">
                        <h6 className="text-uppercase fw-bold mb-3">Kontak Kami</h6>
                        <ul className="list-unstyled text-white-50">
                            <li className="mb-2">
                                <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                                Jakarta, Indonesia
                            </li>
                            <li className="mb-2">
                                <i className="bi bi-telephone-fill me-2 text-primary"></i>
                                +62 812-3456-7890
                            </li>
                            <li className="mb-2">
                                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                                info@tokoinformatika.com
                            </li>
                            <li className="mb-2">
                                <i className="bi bi-clock-fill me-2 text-primary"></i>
                                Senin - Jumat: 08.00 - 17.00
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-top border-secondary py-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                            <p className="mb-0 text-white-50 small">
                                © {currentYear} Toko Informatika. All rights reserved.
                            </p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p className="mb-0 text-white-50 small">
                                Made with <i className="bi bi-heart-fill text-danger"></i> by Your Team
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS untuk hover effect */}
            <style jsx>{`
                .hover-link {
                    transition: all 0.3s ease;
                }
                .hover-link:hover {
                    color: #fff !important;
                    padding-left: 5px;
                }
                .btn-outline-light:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(255,255,255,0.2);
                }
                .nav-link {
                    position: relative;
                    transition: all 0.3s ease;
                }
                .nav-link:hover {
                    color: #0d6efd !important;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 50%;
                    background-color: #0d6efd;
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                }
                .nav-link:hover::after,
                .nav-link.active::after {
                    width: 80%;
                }
            `}</style>
        </footer>
    );
}

export default FooterComponent;