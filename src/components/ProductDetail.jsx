import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../api';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart, cartItems, stockError } = useCart();

    const cartItem = product ? cartItems.find(item => item.id === product.id) : null;
    const inCartQuantity = cartItem ? cartItem.quantity : 0;
    const availableStock = product ? product.currentStock - inCartQuantity : 0;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
    if (!product) return <ErrorMessage message="Producto no encontrado" />;

    return (
        <div className="product-detail">
            <img
                src={product.image}
                alt={product.title}
                className="product-detail-image"
            />
            <div className="product-detail-info">
                <h2>{product.title}</h2>
                <span className="category">{product.category}</span>
                <p className="description">{product.description}</p>
                <p className="price">${product.price.toFixed(2)}</p>
                <p className="stock">Disponibles: {availableStock} de {product.maxStock}</p>
                {stockError && stockError.includes(product.title) && (
                    <div className="stock-error">{stockError}</div>
                )}
                <button
                    onClick={() => addToCart(product)}
                    className="add-to-cart"
                    disabled={availableStock <= 0}
                >
                    {availableStock > 0 ? 'Añadir al carrito' : 'Sin stock'}
                </button>
                <Link to="/products" className="back-to-products">
                    Volver a productos
                </Link>
            </div>
        </div>
    );
};

export default ProductDetail;
