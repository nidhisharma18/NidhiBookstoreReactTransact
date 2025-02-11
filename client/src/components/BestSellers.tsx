import React from 'react';
import '../assets/css/BestSellers.css';

const books = [
    { id: 1, title: "The Thursday Murder Club", author: "Richard Osman", image: "path/to/thursday-murder-club.png" },
    { id: 2, title: "The Hunter", author: "Tana French", image: "path/to/the-hunter.png" },
    { id: 3, title: "The Maid", author: "Nita Prose", image: "path/to/the-maid.png" },
    { id: 4, title: "It Starts With Us", author: "Colleen Hoover", image: "path/to/it-starts-with-us.png" },
    { id: 5, title: "We Solve Murders", author: "Richard Osman", image: "path/to/we-solve-murders.png" }
];

const BestSellers = () => {
    return (
        <div className="best-sellers">
            <div className="bookshelf">
                {books.map(book => (
                    <div key={book.id} className="book">
                        <img src={require(`../assets/images/${book.image}`)} alt={book.title} />
                        <div className="book-info">
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                        </div>
                        <button className="shop-now-button">Shop Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellers;