import React, { createContext, useState, useContext, ReactNode } from 'react';
import { coffeeData } from '../../interface/coffeeData'; // Importe a interface de coffeeData

interface CartContextType {
  cart: coffeeData[];
  addToCart: (product: coffeeData) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

interface CartProviderProps {
    children: ReactNode;
  }

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps>= ({ children }) => {
  const [cart, setCart] = useState<coffeeData[]>([]);

  const addToCart = (product: coffeeData) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter(product => product.id_coffee !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
