import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../assets/context/CartContext";
import { useOrderDetails } from "../assets/context/OrderDetailsContext";
import "../assets/css/Checkout.css";
import { CustomerForm } from "../types";
import axios from "axios";
import CartTable from "./CartTable";

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const { dispatch: updateOrderDetails } = useOrderDetails();

    const [formData, setFormData] = useState<CustomerForm>({
        name: "",
        address: "",
        phone: "",
        email: "",
        ccNumber: "",
        ccExpiryMonth: new Date().getMonth() + 1,
        ccExpiryYear: new Date().getFullYear(),
    });

    const [errors, setErrors] = useState<{ [key in keyof CustomerForm]?: string } & { general?: string }>({});
    const [checkoutStatus, setCheckoutStatus] = useState("");

    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const isValidExpiryDate = (month: number, year: number) => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        return year > currentYear || (year === currentYear && month >= currentMonth);
    };

    const isValidForm = () => {
        const newErrors: { [key in keyof CustomerForm]?: string } = {};

        if (!formData.name || formData.name.length < 4 || formData.name.length > 45) {
            newErrors.name = "Name must be between 4 and 45 characters.";
        }

        if (!formData.address || formData.address.length < 4 || formData.address.length > 45) {
            newErrors.address = "Address must be between 4 and 45 characters.";
        }

        if (!formData.phone || formData.phone.length !== 10) {
            newErrors.phone = "Phone number must be 10 digits.";
        }

        if (!formData.email || !isValidEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.ccNumber || formData.ccNumber.length !== 16) {
            newErrors.ccNumber = "Credit card number must be 16 digits.";
        }

        if (!formData.ccExpiryMonth || !formData.ccExpiryYear) {
            newErrors.ccExpiryMonth = "Credit card expiry date is required.";
        } else if (!isValidExpiryDate(formData.ccExpiryMonth, formData.ccExpiryYear)) {
            newErrors.ccExpiryMonth = "Invalid expiration date. Please use a valid future date.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const placeOrder = async (customerForm: CustomerForm) => {
        const order = {
            customerForm: { ...customerForm },
            cart: {
                itemArray: cart.map((item) => ({
                    quantity: item.quantity,
                    book: {
                        bookId: item.bookId,
                        price: item.price,
                        categoryId: item.categoryId,
                    },
                })),
                surcharge: 500,
            },
        };

        try {
            const response = await axios.post("/NidhiBookstoreReactTransact/api/orders",
                order,
                { headers: { "Content-Type": "application/json" } }
            );

            const orderDetails = {
                ...response.data,
                customer: { ...customerForm },
            };

            updateOrderDetails({ type: "UPDATE", payload: orderDetails });
            clearCart();
            return orderDetails;
        } catch (error: any) {
            console.error("Error placing order:", error);
            setErrors({ general: "An unexpected error occurred. Please try again." });
            return null;
        }
    };

    const submitOrder = async (event: FormEvent) => {
        event.preventDefault();
        const isFormCorrect = isValidForm();
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder(formData);
            if (orders) {
                setCheckoutStatus("OK");
                navigate("/confirmation");
            } else {
                setCheckoutStatus("ERROR");
            }
        }
    };

    const handleInputChange = (field: keyof CustomerForm, value: string | number) => {
        setFormData({ ...formData, [field]: value });

        const newErrors = { ...errors };
        switch (field) {
            case "name":
                if (value && value.toString().length >= 4 && value.toString().length <= 45) {
                    delete newErrors.name;
                } else {
                    newErrors.name = "Name must be between 4 and 45 characters.";
                }
                break;
            case "ccExpiryMonth":
            case "ccExpiryYear":
                if (isValidExpiryDate(formData.ccExpiryMonth, formData.ccExpiryYear)) {
                    delete newErrors.ccExpiryMonth;
                    delete newErrors.ccExpiryYear;
                } else {
                    newErrors.ccExpiryMonth = "Invalid expiration date. Please use a valid future date.";
                }
                break;
        }

        setErrors(newErrors);
    };

    return (
        <div className="checkout-page">
            <div className="checkout-layout">
                <div className="cart-section">
                    <CartTable />
                </div>
                <div className="form-section">
                    <form onSubmit={submitOrder} method="post">
                        {checkoutStatus === "ERROR" && <p className="error-message">{errors.general}</p>}
                        <label>
                            Name:
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </label>
                        <label>
                            Address:
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                            />
                            {errors.address && <p className="error-message">{errors.address}</p>}
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                            />
                            {errors.phone && <p className="error-message">{errors.phone}</p>}
                        </label>
                        <label>
                            Email:
                            <input
                                type="text"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                            />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </label>
                        <label>
                            Credit Card Number:
                            <input
                                type="text"
                                value={formData.ccNumber}
                                onChange={(e) => handleInputChange("ccNumber", e.target.value)}
                            />
                            {errors.ccNumber && <p className="error-message">{errors.ccNumber}</p>}
                        </label>
                        <label>
                            Expiry Date:
                            <div className="expiry-date-container">
                                <select
                                    value={formData.ccExpiryMonth}
                                    onChange={(e) => handleInputChange("ccExpiryMonth", parseInt(e.target.value))}
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                        <option key={month} value={month}>
                                            {month.toString().padStart(2, "0")}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={formData.ccExpiryYear}
                                    onChange={(e) => handleInputChange("ccExpiryYear", parseInt(e.target.value))}
                                >
                                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.ccExpiryMonth && <p className="error-message">{errors.ccExpiryMonth}</p>}
                        </label>
                        <button type="submit" className="checkout-button" disabled={checkoutStatus === "PENDING"}>
                            Checkout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
