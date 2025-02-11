import React from 'react';
import { useOrderDetails } from '../assets/context/OrderDetailsContext';
import '../assets/css/ConfirmationPage.css';

const ConfirmationPage: React.FC = () => {
    const { state } = useOrderDetails();
    const { orderDetails } = state;

    if (!orderDetails) {
        return <div>No order details available. Please place an order first.</div>;
    }

    const { order, customer, books, lineItems } = orderDetails;
    const formattedDate = new Date(order.dateCreated).toLocaleString();
    const lastFourDigits = customer.ccNumber.slice(-4);
    const subtotal = books.reduce((acc, book) => {
        const lineItem = lineItems.find(item => item.bookId === book.bookId);
        return acc + (book.price * (lineItem?.quantity || 0));
    }, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <h1 className="confirmation-header">Order Confirmation</h1>
                <p className="confirmation-subheader">
                    Thank you for your purchase. Below are your order details.
                </p>

                <div className="details-section">
                    <h2>Order Details</h2>
                    <p><strong>Order ID:</strong> {order.orderId}</p>
                    <p><strong>Confirmation Number:</strong> {order.confirmationNumber}</p>
                    <p><strong>Date:</strong> {formattedDate}</p>
                </div>

                <div className="details-section">
                    <h2>Customer Information</h2>
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Address:</strong> {customer.address}</p>
                    <p>
                        <strong>Credit Card:</strong> **** ****
                        **** {lastFourDigits} (Expires: {customer.ccExpiryMonth}/{customer.ccExpiryYear})
                    </p>
                </div>

                <div className="details-section">
                    <h2>Purchased Books</h2>
                </div>

                <div className="table-container">
                    <table className="confirmation-table">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map(book => {
                            const lineItem = lineItems.find(item => item.bookId === book.bookId);
                            return (
                                <tr key={book.bookId}>
                                    <td>{book.title}</td>
                                    <td>{lineItem?.quantity || 0}</td>
                                    <td>${(book.price * (lineItem?.quantity || 0)).toFixed(2)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                <div className="totals-section">
                    <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                    <p><strong>Tax:</strong> ${tax.toFixed(2)}</p>
                    <p><strong>Total:</strong> ${total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
