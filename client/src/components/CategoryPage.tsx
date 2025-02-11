import React, { useState, useEffect } from "react";
import "../assets/css/BookDisplay.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../assets/context/CartContext";
import { useCategory } from "../assets/context/CategoryContext";
import { BookItem } from "../types";

interface Book {
    bookId: number;
    title: string;
    author: string;
    price: number;
    image: string;
}

const titleToImageMap: { [key: string]: string } = {
    "The Moonstone": `${process.env.PUBLIC_URL}/img/moonstone.jpg`,
    "Gone Girl": `${process.env.PUBLIC_URL}/img/gonegirl.jpg`,
    "Devil in a Blue Dress": `${process.env.PUBLIC_URL}/img/devil.jpg`,
    "Presumed Innocent": `${process.env.PUBLIC_URL}/img/inoccent.jpg`,
    "The Girl with the Dragon Tattoo": `${process.env.PUBLIC_URL}/img/dragon.gif`,
    "The Silence of the Lambs": `${process.env.PUBLIC_URL}/img/lambs.jpg`,
    "Pride and Prejudice": `${process.env.PUBLIC_URL}/img/pp.jpg`,
    "The Notebook": `${process.env.PUBLIC_URL}/img/nb.jpg`,
    "Beach Read": `${process.env.PUBLIC_URL}/img/beach.jpg`,
    "Me Before You": `${process.env.PUBLIC_URL}/img/mby.jpg`,
    "The Time Traveler's Wife": `${process.env.PUBLIC_URL}/img/time.jpg`,
    "To Kill a Mockingbird": `${process.env.PUBLIC_URL}/img/mocking.jpg`,
    "The Great Gatsby": `${process.env.PUBLIC_URL}/img/gatsby.jpg`,
    "1984": `${process.env.PUBLIC_URL}/img/1984.png`,
    "Brave New World": `${process.env.PUBLIC_URL}/img/bnw.jpg`,
    "Catch-22": `${process.env.PUBLIC_URL}/img/c22.jpg`,
    "Steve Jobs": `${process.env.PUBLIC_URL}/img/steve.jpg`,
    "The Diary of a Young Girl": `${process.env.PUBLIC_URL}/img/anne.jpg`,
    "Long Walk to Freedom": `${process.env.PUBLIC_URL}/img/nelson.jpg`,
    "Educated": `${process.env.PUBLIC_URL}/img/ed.jpg`,
    "The Wright Brothers": `${process.env.PUBLIC_URL}/img/bros.jpg`,
    "One True Loves: A Novel": `${process.env.PUBLIC_URL}/img/love.jpg`,
    "The Catcher in the Rye": `${process.env.PUBLIC_URL}/img/catcher.jpg`,
    "Becoming": `${process.env.PUBLIC_URL}/img/obama.jpg`,
};

const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const { setLastSelectedCategory } = useCategory();
    const navigate = useNavigate();
    const [books, setBooks] = useState<BookItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { addItemToCart } = useCart();

    const categories = ["Thriller", "Romance", "Fiction", "Biography"];

    useEffect(() => {
        if (category) {
            setLastSelectedCategory(category);
        }

        const fetchBooks = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await axios.get(`/NidhiBookstoreReactTransact/api/categories/name/${category}/books`);
                setBooks(result.data || []);
            } catch (error) {
                setError("Failed to fetch books. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [category, setLastSelectedCategory]);

    const getImage = (title: string) => {
        return titleToImageMap[title] || `${process.env.PUBLIC_URL}/img/placeholder.jpg`;
    };

    const handleCategoryClick = (categoryName: string) => {
        navigate(`/category/${categoryName.toLowerCase()}`);
    };

    return (
        <div className="category-page" style={{ backgroundImage: `url(${require("../assets/images/bestsellers/bg1.png")})`, backgroundSize: 'cover' }}>
            <div className="sidebar">
                <h3>Categories</h3>
                <ul className="category-list">
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            className={`category-item ${cat.toLowerCase() === category ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="books-container">
                {loading ? (
                    <p>Loading books...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : books.length > 0 ? (
                    books.map((book) => (
                        <div key={book.bookId} className="book-card">
                            <div className="book-image-container">
                                <img
                                    src={getImage(book.title)}
                                    alt={book.title}
                                    className="book-image"
                                    style={{ width: "200px", height: "200px" }}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = `${process.env.PUBLIC_URL}/img/placeholder.jpg`;
                                    }}
                                />
                            </div>
                            <button className="read-now-button">Read Now</button>
                            <div className="book-details">
                                <h2 className="book-title">{book.title}</h2>
                                <p className="book-author">{book.author}</p>
                                <p className="book-price">${book.price.toFixed(2)}</p>
                                <button
                                    className="add-to-cart-button"
                                    onClick={() => addItemToCart({ ...book, bookId: book.bookId, quantity: 1 })}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No books available in this category.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
export { titleToImageMap };

