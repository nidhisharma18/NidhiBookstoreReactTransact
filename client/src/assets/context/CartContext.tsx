import React, { createContext, useReducer, useContext, ReactNode, useEffect } from "react";
import { CartItem } from "../../types";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const storageKey = "cart";

const cartReducer = (state: CartItem[], action: any): CartItem[] => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.findIndex(
          (cartItem) => cartItem.bookId === action.payload.bookId
      );

      if (existingItemIndex >= 0) {
        const updatedCart = state.map((cartItem, index) =>
            index === existingItemIndex
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
        return updatedCart;
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case "REMOVE_ITEM":
      const itemIndex = state.findIndex(
          (cartItem) => cartItem.bookId === action.payload.bookId
      );
      if (itemIndex >= 0) {
        const updatedCart = [...state];
        const item = updatedCart[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          updatedCart.splice(itemIndex, 1);
        }
        return updatedCart;
      }
      return state;

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialCartState: CartItem[] = [];

  const [cart, dispatch] = useReducer(
      cartReducer,
      initialCartState,
      (initialState) => {
        try {
          const storedCart = JSON.parse(localStorage.getItem(storageKey) || "[]");
          return storedCart as CartItem[] || initialState;
        } catch (error) {
          console.error("Error parsing cart", error);
          return initialState;
        }
      }
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItemFromCart = (item: CartItem) => dispatch({ type: "REMOVE_ITEM", payload: item });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
      <CartContext.Provider value={{ cart, cartCount, addItemToCart, removeItemFromCart, clearCart }}>
        {children}
      </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartContext };
