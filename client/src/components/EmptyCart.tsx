import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/EmptyCart.css";
import { useCategory } from "../assets/context/CategoryContext";

const EmptyCart: React.FC = () => {
    const navigate = useNavigate();
    const { lastSelectedCategory } = useCategory();

    const handleContinueShopping = () => {
        navigate(`/category/${lastSelectedCategory || ""}`);
    };

    return (
        <div className="empty-cart-page">
            <div className="empty-cart-container">
                <h2>Your cart is empty!</h2>
                <p>It looks like you haven't added anything to your cart yet.</p>
                <button onClick={handleContinueShopping} className="continue-shopping-button">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default EmptyCart;
