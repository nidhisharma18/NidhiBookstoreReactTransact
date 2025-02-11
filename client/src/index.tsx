import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./assets/context/CartContext";
import { CategoryProvider } from "./assets/context/CategoryContext";

ReactDOM.render(
    <CartProvider>
        <CategoryProvider>
            <App />
        </CategoryProvider>
    </CartProvider>,
    document.getElementById("root")
);
