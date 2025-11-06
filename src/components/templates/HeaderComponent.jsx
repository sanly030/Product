import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function HeaderComponent() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <div className="bg-primary bg-gradient rounded-3 p-2 me-2">
                        <i className="bi bi-shop text-white fs-5"></i>
                    </div>
                    <span className="fw-bold text-primary">Toko Informatika</span>
                </Link>
                
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-controls="navbarNav"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link 
                                to="/" 
                                className={`nav-link px-3 ${isActive('/') ? 'active fw-semibold text-primary' : ''}`}
                            >
                                <i className="bi bi-house-door me-1"></i>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/list-produk" 
                                className={`nav-link px-3 ${isActive('/list-produk') ? 'active fw-semibold text-primary' : ''}`}
                            >
                                <i className="bi bi-box-seam me-1"></i>
                                Produk
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/about" 
                                className={`nav-link px-3 ${isActive('/about') ? 'active fw-semibold text-primary' : ''}`}
                            >
                                <i className="bi bi-info-circle me-1"></i>
                                Tentang
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/contact" 
                                className={`nav-link px-3 ${isActive('/contact') ? 'active fw-semibold text-primary' : ''}`}
                            >
                                <i className="bi bi-envelope me-1"></i>
                                Kontak
                            </Link>
                        </li>
                    </ul>
                    <div className="d-lg-none mt-3 mb-2">
                        <hr />
                        <div className="d-flex gap-3 justify-content-center">
                            <a href="#" className="text-primary">
                                <i className="bi bi-facebook fs-5"></i>
                            </a>
                            <a href="#" className="text-primary">
                                <i className="bi bi-instagram fs-5"></i>
                            </a>
                            <a href="#" className="text-primary">
                                <i className="bi bi-twitter fs-5"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default HeaderComponent;