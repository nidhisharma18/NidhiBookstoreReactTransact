import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryNav: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className="category-nav">
            <div className="dropdown-menu">
            </div>
        </nav>
    );
};

export default CategoryNav;