import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart, cartItems, stockError } = useCart();

    const cartItem = cartItems.find(item => item.id === product.id);
    const inCartQuantity = cartItem ? cartItem.quantity : 0;
    const availableStock = product.currentStock - inCartQuantity;

    return (
        <div className="product-card">
            <img
                src={product.image}
                alt={product.title}
                className="product-card-image"
            />
            <div className="product-card-content">
                <h3>{product.title}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <p className="stock">Disponibles: {availableStock} de {product.maxStock}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="add-to-cart"
                    disabled={availableStock <= 0}
                >
                    {availableStock > 0 ? 'Añadir al carrito' : 'Sin stock'}
                </button>
                {stockError && stockError.includes(product.title) && (
                    <div className="stock-error">{stockError}</div>
                )}
                <Link to={`/products/${product.id}`} className="view-detail">
                    Ver detalles
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
