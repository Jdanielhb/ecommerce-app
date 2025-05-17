import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [stockError, setStockError] = useState(null);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const getAvailableStock = (productId) => {
        const product = cartItems.find(item => item.id === productId);
        if (!product) return 0;
        return product.maxStock - product.quantity;
    };

    const addToCart = (product) => {
        setStockError(null);

        const existingItem = cartItems.find(item => item.id === product.id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;

        if (currentQuantity >= product.maxStock) {
            setStockError(`No hay más stock disponible de ${product.title}`);
            return;
        }

        setCartItems(prevItems => {
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
        setStockError(null);
    };

    const updateCartItem = (productId, newQuantity) => {
        setStockError(null);

        const product = cartItems.find(item => item.id === productId);
        if (!product) return;

        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        if (newQuantity > product.maxStock) {
            setStockError(`No puedes agregar más de ${product.maxStock} unidades de ${product.title}`);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        setStockError(null);
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItem,
                clearCart,
                cartTotal,
                stockError,
                setStockError,
                getAvailableStock
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
