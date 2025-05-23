import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from './CartItem';
import ErrorMessage from './ErrorMessage';

const Cart = () => {
    const { cartItems, clearCart, cartTotal, stockError } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            const confirmLogin = confirm('Debes iniciar sesión para finalizar tu compra. ¿Deseas ir al login ahora?');
            if (confirmLogin) {
                navigate('/login', { state: { from: '/cart' } }); // Guarda la ruta actual para redirigir después del login
            }
            return;
        }
        navigate('/checkout'); // Redirige al checkout si el usuario está autenticado
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart empty-cart">
                <h2>Tu carrito está vacío</h2>
                <p className="cart-empty-message">No hay productos en tu carrito</p>
                <Link to="/products" className="continue-shopping-button">
                    Continuar comprando
                </Link>
            </div>
        );
    }

    return (
        <div className="cart">
            <h2>Tu Carrito</h2>

            {stockError && <ErrorMessage message={stockError} />}

            <div className="cart-items-list">
                {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>

            <div className="cart-summary">
                <h3>Total: <span>${cartTotal.toFixed(2)}</span></h3>
            </div>

            <div className="cart-actions">
                <div className="buttons-container">
                    <button
                        onClick={clearCart}
                        className="clear-cart-button"
                        aria-label="Vaciar carrito"
                    >
                        Vaciar carrito
                    </button>
                    <button
                        onClick={handleCheckout}
                        className="checkout-button"
                        aria-label="Finalizar compra"
                    >
                        Finalizar compra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
