import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateCartItem, removeFromCart, getAvailableStock, stockError } = useCart();

    const handleIncrease = () => {
        const availableStock = getAvailableStock(item.id);
        if (availableStock <= 0) {
            updateCartItem(item.id, item.quantity); // No cambia la cantidad
            return;
        }
        updateCartItem(item.id, item.quantity + 1);
    };

    const handleDecrease = () => {
        updateCartItem(item.id, item.quantity - 1);
    };

    return (
        <div className="cart-item">
            <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
            />
            <div className="cart-item-info">
                <h4>{item.title}</h4>
                <p className="price">${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                    <button
                        onClick={handleDecrease}
                        className="quantity-button"
                        aria-label="Reducir cantidad"
                    >
                        -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                        onClick={handleIncrease}
                        className="quantity-button"
                        disabled={item.quantity >= item.maxStock}
                        aria-label="Aumentar cantidad"
                    >
                        +
                    </button>
                    <span className="stock-info">
                        ({item.maxStock - item.quantity} disponibles)
                    </span>
                </div>
                {stockError && stockError.includes(item.title) && (
                    <div className="stock-error-message">
                        {stockError}
                    </div>
                )}
            </div>
            <button
                onClick={() => removeFromCart(item.id)}
                className="remove-item"
                aria-label="Eliminar producto"
            >
                Eliminar
            </button>
        </div>
    );
};

export default CartItem;
