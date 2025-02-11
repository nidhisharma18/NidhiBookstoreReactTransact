import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../assets/context/CartContext";
import '../assets/css/CategoryBookListItem.css';

const CartItem: React.FC = () => {
    const { cartCount } = useCart();

    return (
        <Link to="/cart" className="nav-link">
            <img
                src={require("../assets/images/site/cart-img.png")}
                alt="Cart"
                className="cart-icon"
            />
            <span className="cart-count">{cartCount}</span>
        </Link>
    );
};

export default CartItem;
