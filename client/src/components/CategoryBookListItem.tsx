import React from 'react';
import { BookItem } from "../types";
import '../assets/css/CategoryBookListItem.css';

interface CategoryBookListItemProps {
    book: BookItem;
}

const CategoryBookListItem: React.FC<CategoryBookListItemProps> = ({ book }) => {
    return (
        <div className="book-item">
            <h3>{book.title}</h3>
            <p>{book.author} - ${book.price / 100}</p>
        </div>
    );
};

export default CategoryBookListItem;
