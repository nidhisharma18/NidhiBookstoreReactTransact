import React, { useState, useEffect } from 'react';
import CategoryBookListItem from './CategoryBookListItem';
import { BookItem } from '../types';
import '../assets/css/CategoryBookList.css';

const CategoryBookList = () => {
    const [books, setBooks] = useState<BookItem[]>([]);

    useEffect(() => {
        fetch("/NidhiBookstoreReactTransact/api/books")
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });
    }, []);

    return (
        <div className="category-book-list">
            {books.map((book) => (
                <CategoryBookListItem key={book.bookId} book={book} />
            ))}
        </div>
    );
};

export default CategoryBookList;
