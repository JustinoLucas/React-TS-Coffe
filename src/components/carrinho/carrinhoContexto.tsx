import React, { createContext, useContext, useState } from "react";
import { coffeeData } from "../../interface/coffeeData";
import "./carrinho.css"
// Define o tipo do estado do carrinho
interface CarrinhoItem {
  produto: coffeeData;
  quantidade: number;
}

interface CarrinhoContextoProps {
  carrinho: CarrinhoItem[];
  addItem: (produto: coffeeData) => void;
  removeItem: (id: number) => void;
  total: number;
}

// Inicializa o contexto fora do componente
const CartContext = createContext<CarrinhoContextoProps | undefined>(undefined);

// Função redutora para gerenciar o estado do carrinho
export const CarrinhoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);

  // Adicionar item ao carrinho
  const addItem = (produto: coffeeData) => {
    const itemExistente = carrinho.find((item) => item.produto.id_coffee === produto.id_coffee);

    if (itemExistente) {
      setCarrinho((prev) =>
        prev.map((item) =>
          item.produto.id_coffee === produto.id_coffee
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho((prev) => [...prev, { produto, quantidade: 1 }]);
    }
  };

  // Remover item do carrinho
  const removeItem = (id: number) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.produto.id_coffee === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  // Calcular total
  const total = carrinho.reduce(
    (acc, item) => acc + item.produto.preco_coffee * item.quantidade,
    0
  );

  return (
    <CartContext.Provider value={{ carrinho, addItem, removeItem, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CarrinhoProvider");
  return context;
};