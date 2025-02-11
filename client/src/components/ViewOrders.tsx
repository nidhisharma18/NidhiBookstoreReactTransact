import React from 'react';
import { useCart } from '../assets/context/CartContext';
import '../assets/css/ViewOrders.css';

const ViewOrdersPage: React.FC = () => {
    const { cart } = useCart();

    return (
        <div className="view-orders-page">
            <div className="orders-container">
                <h1>Your Orders</h1>
                {cart.length > 0 ? (
                    <div className="orders-grid">
                        {cart.map((item) => (
                            <div key={item.bookId} className="order-card">
                                <img src={item.image} alt={item.title} className="order-image" />
                                <div className="order-details">
                                    <h3>{item.title}</h3>
                                    <p>Author: {item.author}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No orders found. Start shopping now!</p>
                )}
            </div>
        </div>
    );
};

export default ViewOrdersPage;