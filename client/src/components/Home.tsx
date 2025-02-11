import React from 'react';
import '../assets/css/BestSellers.css';
import { useNavigate } from 'react-router-dom';

const BestSellers = () => {
    const backgroundImageUrl = require('../assets/images/bestsellers/bg1.png');
    const navigate = useNavigate();

    const books = [
        { id: 1, title: "The Thursday Murder Club", author: "Richard Osman", image: require("../assets/images/bestsellers/murder.png") },
        { id: 2, title: "The Hunter", author: "Tana French", image: require("../assets/images/bestsellers/hunter.png") },
        { id: 3, title: "The Maid", author: "Nita Prose", image: require("../assets/images/bestsellers/maid.png") },
        { id: 4, title: "It Starts With Us", author: "Colleen Hoover", image: require("../assets/images/bestsellers/starts.png") },
        { id: 5, title: "We Solve Murders", author: "Richard Osman", image: require("../assets/images/bestsellers/solvem.png") }
    ];

    return (
        <div className="best-sellers" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            <h1 className="centered-heading">This week's best sellers!!</h1>
            <div className="bookshelf">
                {books.map((book, index) => (
                    <div key={book.id} className="book">
                        <img src={book.image} alt={book.title} />
                        <div className="book-info">
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                        </div>
                        {index === 0 && (
                            <button className="shop-now-button" onClick={() => navigate('/category/thriller')}>
                                Shop Now
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellers;
