import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../assets/context/CartContext";
import { useCategory } from "../assets/context/CategoryContext";
import "../assets/css/CartTable.css";
import { titleToImageMap } from "./CategoryPage";
import "../assets/css/bg.css";

function CartTable() {
    const { cart, addItemToCart, removeItemFromCart, clearCart } = useCart();
    const { lastSelectedCategory } = useCategory();
    const navigate = useNavigate();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Navigate to the last selected category page to continue shopping
    const handleContinueShopping = () => {
        navigate(`/category/${lastSelectedCategory || ""}`);
    };

    // Clear the cart and navigate to the empty cart page
    const handleClearCart = () => {
        clearCart();
        navigate("/empty-cart");
    };


    const handleRemoveItem = (book: any) => {
        if (book.quantity === 1) {
            removeItemFromCart(book);
            if (cart.length === 1) {
                navigate("/empty-cart");
            }
        } else {
            removeItemFromCart(book);
        }
    };

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <div className="background-wrapper">
            <div className="cart-page">
                <div className="cart-table-container">
                    {cart.length === 0 ? (
                        <div className="empty-cart-message">
                            <h2>Oops, your cart is empty!</h2>
                            <p>Let’s go find some books to add.</p>
                            <button onClick={handleContinueShopping} className="cart-button continue-shopping-button">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            <ul className="cart-table">
                                <li className="cart-table-heading">
                                    <div className="cart-heading-cell cart-heading-book">Book</div>
                                    <div className="cart-heading-cell cart-heading-price">Price</div>
                                    <div className="cart-heading-cell cart-heading-quantity">Quantity</div>
                                    <div className="cart-heading-cell cart-heading-subtotal">Amount</div>
                                </li>
                                {cart.map((book) => (
                                    <li key={book.bookId} className="cart-table-row">
                                        <div className="cart-table-cell cart-book-info">
                                            <div className="cart-book-image-wrapper">
                                                <img
                                                    className="cart-book-image"
                                                    src={titleToImageMap[book.title]}
                                                    alt={book.title}
                                                />
                                            </div>
                                            <span className="cart-book-title">{book.title}</span>
                                        </div>
                                        <div className="cart-table-cell cart-book-price">
                                            ${book.price.toFixed(2)}
                                        </div>
                                        <div className="cart-table-cell cart-book-quantity">
                                            <button
                                                className="icon-button dec-button"
                                                onClick={() => handleRemoveItem(book)}
                                            >
                                                -
                                            </button>
                                            <span className="quantity">{book.quantity}</span>
                                            <button
                                                className="icon-button inc-button"
                                                onClick={() => addItemToCart(book)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="cart-table-cell cart-book-subtotal">
                                            ${(book.price * book.quantity).toFixed(2)}
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="cart-subtotal-section">
                                <span>
                                    Total {totalItems === 1 ? "item" : "items"}: {totalItems}
                                </span>
                                <span>Subtotal: ${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="cart-button-container">
                                <button onClick={handleContinueShopping} className="cart-button continue-shopping-button">
                                    Continue Shopping
                                </button>
                                <button onClick={handleClearCart} className="cart-button clear-cart-button">
                                    Clear Cart
                                </button>
                                <button onClick={handleCheckout} className="cart-button checkout-button">
                                    Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartTable;
