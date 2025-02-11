import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import axios from "axios";
import { CategoryItem } from "../../types";


interface CategoryContextType {
    categories: CategoryItem[];
    lastSelectedCategory: string;
    setLastSelectedCategory: (category: string) => void;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryContextProps {
    children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryContextProps> = ({ children }) => {
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [lastSelectedCategory, setLastSelectedCategory] = useState("thriller"); // Default to "thriller" or any category

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await axios.get("/NidhiBookstoreReactTransact/api/categories");
                setCategories(result.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, lastSelectedCategory, setLastSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
};
