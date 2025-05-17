import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© 2024 E-Commerce App - Todos los derechos reservados</p>
                <nav className="footer-links">
                    <h2>Sobre nosotros</h2>
                    <h2>Contacto</h2>
                    <h2>Términos y condiciones</h2>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
