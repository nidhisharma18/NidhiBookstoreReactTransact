import "../assets/css/global.css";
import "../assets/css/AppHeader.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../assets/context/CategoryContext"; // Use useCategory hook
import { CartContext } from "../assets/context/CartContext";
import CartItem from "./CartItem";

const AppHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { categories } = useCategory();
    const navigate = useNavigate();
    const { cartCount } = useContext(CartContext)!;

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategorySelect = (name: string) => {
        handleNavigate(`/category/${name.toLowerCase()}`);
        setIsDropdownOpen(false);
    };

    return (
        <header className="header">
            <div onClick={() => handleNavigate("/")} className="logo-and-title">
                <img src={require("../assets/images/site/quietbook.png")} alt="The Quiet Book Store"/>
                <h1>The Quiet Book Store</h1>
            </div>
            <div className="search-bar">
                <span className="search-icon"></span>
                <input type="text" className="search-input" placeholder="Search for Stories Worth Getting Lost In"/>
                <button className="search-button">Search</button>
        </div>
    <nav className="navigation">
        <button className="nav-link" onClick={() => handleNavigate('/')}>Home</button>
        <div className="dropdown">
            <button onClick={toggleDropdown} className="nav-link dropdown-btn">Category</button>
                    <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                        {categories.map((category) => (
                            <button
                                key={category.categoryId}
                                className="dropdown-item"
                                onClick={() => handleCategorySelect(category.name)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
                <CartItem/>
                <button className="nav-link" onClick={() => handleNavigate('/signup')}>Sign Up</button>
                <button className="nav-link" onClick={() => handleNavigate('/login')}>Login</button>
                <button className="nav-link" onClick={() => handleNavigate('/signout')}>Sign Out</button>
            </nav>
        </header>
    );
};

export default AppHeader;
