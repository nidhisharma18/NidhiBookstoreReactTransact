import React from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import { CartProvider } from "./assets/context/CartContext";
import BestSellers from './components/BestSellers';
import CategoryBookList from "./components/CategoryBookList";
import Home from './components/Home';
import CategoryPage from "./components/CategoryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryNav from "./components/CategoryNav";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ConfirmationPage from "./components/ConfirmationPage";
import ViewOrders from "./components/ViewOrders";
import EmptyCart from "./components/EmptyCart";
import {OrderDetailsProvider} from "./assets/context/OrderDetailsContext";

function App() {
    return (
        <CartProvider>
            <OrderDetailsProvider>
            <Router basename={"/NidhiBookstoreReactTransact"}>
                <AppHeader />
                <CategoryNav/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/best-sellers" element={<BestSellers />} />
                    <Route path="/categories" element={<CategoryBookList />} />
                    <Route path="/category/:category" element={<CategoryPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                    <Route path="/orders" element={<ViewOrders />} />
                    <Route path="/empty-cart" element={<EmptyCart />} />
                    <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
                <AppFooter />
            </Router>
            </OrderDetailsProvider>
        </CartProvider>
    );
}

export default App;
