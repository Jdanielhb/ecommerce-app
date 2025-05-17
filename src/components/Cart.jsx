import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import ErrorMessage from './ErrorMessage';

const Cart = () => {
    const { cartItems, clearCart, cartTotal, stockError } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart">
                <h2>Tu carrito está vacío</h2>
                <p className="cart-empty">No hay productos en tu carrito</p>
                <Link to="/products" className="continue-shopping">
                    Continuar comprando
                </Link>
            </div>
        );
    }

    return (
        <div className="cart">
            <h2>Tu Carrito</h2>
            {stockError && <ErrorMessage message={stockError} />}
            <div className="cart-items">
                {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
            <div className="cart-total">
                <h3>Total: <span>${cartTotal.toFixed(2)}</span></h3>
            </div>
            <div className="cart-actions">
                <button onClick={clearCart} className="danger-button">
                    Vaciar carrito
                </button>
                <Link to="/checkout" className="checkout-button">
                    Finalizar compra
                </Link>
            </div>
        </div>
    );
};

export default Cart;
