import React, { useState, useEffect } from "react";
import axios from "axios";
import './deleteCoffeeModal.css';

interface DeleteModalProps {
  closeModal: () => void;
  confirmDelete: (productId: number) => void;
}

interface Coffee {
  id_coffee: number;
  nome_coffee: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ closeModal, confirmDelete }) => {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);

  useEffect(() => {
    // Buscar todos os produtos (coffees) do backend
    axios.get("http://localhost:8080/coffee")
      .then(response => {
        setCoffees(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar os cafés:", error);
      });
  }, []);

  const handleSelectCoffee = (coffee: Coffee) => {
    setSelectedCoffee(coffee);
  };

  const handleCancel = () => {
    setSelectedCoffee(null); // Limpar a seleção
    closeModal(); // Fechar o modal
  };

  const handleConfirmDelete = () => {
    if (selectedCoffee) {
      confirmDelete(selectedCoffee.id_coffee);
      closeModal();
    }
  };

  // Fechar o modal se o usuário clicar fora da área do modal
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="delete-modal-overlay" onClick={handleOverlayClick}>
      <div className="delete-modal">
        <h2>Excluir Café</h2>
        {!selectedCoffee ? (
          <>
            <p>Escolha um café para excluir:</p>
            <ul>
              {coffees.map(coffee => (
                <li key={coffee.id_coffee} onClick={() => handleSelectCoffee(coffee)}>
                  {coffee.nome_coffee}
                </li>
              ))}
            </ul>
            <div className="delete-modal-buttons">
              <button onClick={handleCancel} className="cancel-button">
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <p>Você tem certeza que deseja excluir <b>{selectedCoffee.nome_coffee}</b>?</p>
            <div className="delete-modal-buttons">
              <button onClick={handleConfirmDelete} className="confirm-button">
                Confirmar
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
