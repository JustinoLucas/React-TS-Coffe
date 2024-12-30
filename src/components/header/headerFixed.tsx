import { useState } from "react";
import "./headerFixed.css";
import CreateCoffeeModal from "../modal/createCoffeeModal";
import axios from "axios";
import DeleteModal from "../modal/deleteCoffeeModal";


const HeaderFixed = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [carrinhoOpen, setCarrinhoOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleCarrinho = () => setCarrinhoOpen(!carrinhoOpen);

    const handleDeleteProduct = (productId: number) => {
        axios.delete(`http://localhost:8080/coffee/${productId}`)
            .then(() => {
                alert("Produto excluído com sucesso!");
                // Aqui você pode atualizar a lista de produtos ou fazer outra ação, se necessário
            })
            .catch((error) => {
                console.error("Erro ao excluir o produto:", error);
                alert("Erro ao excluir o produto.");
            });
    };

    return (
        <header className="header-fixed">
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <h1 className="header-titulo">Café Biwlu</h1>
            <button className="carrinho-toggle" onClick={toggleCarrinho}>
                🛒
            </button>
            {menuOpen && (
                <div className="menu-dropdown">
                    <button className="add-product-btn" onClick={() => setModalOpen(true)}>
                        Adicionar novo Café
                    </button>
                    <button className="delete-product-btn" onClick={() => setDeleteModalOpen(true)}>
                        Excluir Café
                    </button>
                    <CreateCoffeeModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}></CreateCoffeeModal>
                </div>

            )}
            {isDeleteModalOpen && (
                <DeleteModal
                    closeModal={() => setDeleteModalOpen(false)}
                    confirmDelete={handleDeleteProduct}
                />
            )}

        </header>
    )

}

export default HeaderFixed