import { useState } from "react";
import "./headerFixed.css";
import CreateCoffeeModal from "../modal/createCoffeeModal";
import DeleteModal from "../modal/deleteCoffeeModal";
import { useCart } from "../carrinho/carrinhoContexto";
import axios from "axios";



const HeaderFixed = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [carrinhoOpen, setCarrinhoOpen] = useState(false);
  const { carrinho, addItem, removeItem } = useCart();

  const total = carrinho.reduce(
    (sum, item) => sum + item.produto.preco_coffee * item.quantidade,
    0
  );

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleCarrinho = () => setCarrinhoOpen(!carrinhoOpen);

  const handleDeleteProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:8080/coffee/${productId}`);
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
    }
  };

  return (
    <header className="header-fixed">
      {/* Botão do menu */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <h1 className="header-titulo">Café Biwlu</h1>

      {/* Botão do carrinho */}
      <button className="carrinho-toggle" onClick={toggleCarrinho}>
        🛒 ({carrinho.length})
      </button>

      {/* Dropdown do menu */}
      {menuOpen && (
        <div className="menu-dropdown">
          <button
            className="add-product-btn"
            onClick={() => setModalOpen(true)}
          >
            Adicionar novo Café
          </button>
          <button
            className="delete-product-btn"
            onClick={() => setDeleteModalOpen(true)}
          >
            Excluir Café
          </button>
          <CreateCoffeeModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>
      )}

      {/* Modal de exclusão */}
      {isDeleteModalOpen && (
        <DeleteModal
          closeModal={() => setDeleteModalOpen(false)}
          confirmDelete={handleDeleteProduct}
        />
      )}

      {/* Dropdown do carrinho */}
      {carrinhoOpen && (
        <div className="carrinho-dropdown">
          {carrinho.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <div>
              <ul>
                {carrinho.map((item) => (
                  <li key={item.produto.id_coffee} className="carrinho-item">
                    <span>
                      {item.quantidade}x {item.produto.nome_coffee}
                    </span>
                    <span>R$ {(item.quantidade * item.produto.preco_coffee).toFixed(2)}</span>
                    <div className="carrinho-actions">
                      <button onClick={() => addItem(item.produto)}>+</button>
                      <button onClick={() => removeItem(item.produto.id_coffee)}>-</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="carrinho-total">
                <strong>Total:</strong> R$ {total.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default HeaderFixed;
