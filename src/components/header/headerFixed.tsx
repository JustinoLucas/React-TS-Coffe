import { useState } from "react";
import "./headerFixed.css";

const HeaderFixed = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [carrinhoOpen, setCarrinhoOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleCarrinho = () => setCarrinhoOpen(!carrinhoOpen);

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
                    <button className="add-product-btn">
                        Adicionar novo Café
                    </button>
                </div>
            )}
        </header>
    )

}

export default HeaderFixed