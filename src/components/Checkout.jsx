import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [paymentInfo, setPaymentInfo] = useState({
        name: user?.name || '',
        city: '',
        paymentMethod: 'credit',
        cardNumber: ''
    });
    const [orderCompleted, setOrderCompleted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para procesar el pago
        console.log('Datos de pago:', paymentInfo);
        console.log('Productos:', cartItems);
        setOrderCompleted(true);
        clearCart();
    };

    if (orderCompleted) {
        return (
            <div className="checkout-success">
                <h2>¡Compra realizada con éxito!</h2>
                <p>Gracias por tu compra, {user.name}.</p>
                <p>Total pagado: ${cartTotal.toFixed(2)}</p>
                <button onClick={() => window.location.href = '/'}>
                    Volver a la tienda
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h2>Finalizar Compra</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre completo</label>
                    <input
                        type="text"
                        name="name"
                        value={paymentInfo.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Ciudad</label>
                    <input
                        type="text"
                        name="city"
                        value={paymentInfo.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Método de pago</label>
                    <select
                        name="paymentMethod"
                        value={paymentInfo.paymentMethod}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="credit">Tarjeta de Crédito</option>
                        <option value="debit">Tarjeta de Débito</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Número de tarjeta</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                    />
                </div>

                <div className="order-summary">
                    <h3>Resumen de tu pedido</h3>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                {item.title} - {item.quantity} x ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p className="total">Total: ${cartTotal.toFixed(2)}</p>
                </div>

                <button type="submit" className="submit-order">
                    Realizar Compra
                </button>
            </form>
        </div>
    );
};

export default Checkout;
