import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cartItems } = useCart();
    const { user, logout } = useAuth();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <h2>E-Commerce</h2>
            </Link>
            <div className="navbar-links">
                <NavLink to="/" end>Inicio</NavLink>
                <NavLink to="/products">Productos</NavLink>
                <NavLink to="/cart">
                    Carrito
                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </NavLink>
                {user ? (
                    <div className="user-section">
                        <img src={user.avatar} alt={user.name} className="user-avatar" />
                        <span className="user-greeting">Hola, {user.name}</span>
                        <button onClick={logout} className="logout-button">
                            Cerrar sesión
                        </button>
                    </div>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
